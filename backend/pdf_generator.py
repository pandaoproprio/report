from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.units import inch, cm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas
from io import BytesIO
from datetime import datetime
import html


class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        self.config = kwargs.pop('config', None)
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(self._pageNumber, num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_num, total_pages):
        if not self.config:
            return

        page_width, page_height = self._pagesize

        # Cabeçalho
        if self.config.get('header_enabled') and page_num > 1:  # Não exibir na capa
            header_text = self.config.get('header_text', '')
            if header_text:
                self.saveState()
                self.setFont('Helvetica', 9)
                y_position = page_height - 1.5*cm

                align = self.config.get('header_align', 'center')
                if align == 'center':
                    x_position = page_width / 2
                    self.drawCentredString(x_position, y_position, header_text)
                elif align == 'right':
                    x_position = page_width - 2.5*cm
                    self.drawRightString(x_position, y_position, header_text)
                else:  # left
                    x_position = 2.5*cm
                    self.drawString(x_position, y_position, header_text)

                # Linha separadora
                self.setStrokeColor(colors.grey)
                self.setLineWidth(0.5)
                self.line(2.5*cm, y_position - 0.2*cm, page_width - 2.5*cm, y_position - 0.2*cm)
                self.restoreState()

        # Rodapé
        if self.config.get('footer_enabled') and page_num > 1:  # Não exibir na capa
            self.saveState()
            self.setFont('Helvetica', 9)
            y_position = 1.5*cm

            footer_text = self.config.get('footer_text', '')
            footer_show_page = self.config.get('footer_show_page_number', True)

            if footer_show_page:
                page_format = self.config.get('footer_page_format', 'Página {page} de {total}')
                page_text = page_format.format(page=page_num - 1, total=total_pages - 1)  # -1 para excluir capa

                if footer_text:
                    footer_text = f"{footer_text} | {page_text}"
                else:
                    footer_text = page_text

            if footer_text:
                # Linha separadora
                self.setStrokeColor(colors.grey)
                self.setLineWidth(0.5)
                self.line(2.5*cm, y_position + 0.4*cm, page_width - 2.5*cm, y_position + 0.4*cm)

                align = self.config.get('footer_align', 'center')
                if align == 'center':
                    x_position = page_width / 2
                    self.drawCentredString(x_position, y_position, footer_text)
                elif align == 'right':
                    x_position = page_width - 2.5*cm
                    self.drawRightString(x_position, y_position, footer_text)
                else:  # left
                    x_position = 2.5*cm
                    self.drawString(x_position, y_position, footer_text)

            self.restoreState()


def hex_to_rgb(hex_color):
    """Converte cor hexadecimal para RGB"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16)/255.0 for i in (0, 2, 4))


def html_to_plain(html_text):
    """Remove tags HTML básicas do texto"""
    if not html_text:
        return ""
    # Remove tags HTML comuns
    text = html.unescape(html_text)
    text = text.replace('<br>', '\n').replace('<br/>', '\n').replace('<br />', '\n')
    text = text.replace('</p>', '\n\n').replace('<p>', '')
    # Remove outras tags
    import re
    text = re.sub('<[^<]+?>', '', text)
    return text.strip()


def generate_report_pdf(report, config):
    """Gera PDF do relatório com configurações personalizadas"""
    buffer = BytesIO()

    # Configurar tamanho da página
    pagesize = A4 if config.page_size == 'A4' else letter

    # Margens
    left_margin = config.page_margin_left * cm
    right_margin = config.page_margin_right * cm
    top_margin = (config.page_margin_top + 1.5) * cm  # +1.5 para cabeçalho
    bottom_margin = (config.page_margin_bottom + 1.5) * cm  # +1.5 para rodapé

    # Criar documento
    doc = SimpleDocTemplate(
        buffer,
        pagesize=pagesize,
        leftMargin=left_margin,
        rightMargin=right_margin,
        topMargin=top_margin,
        bottomMargin=bottom_margin
    )

    # Estilos
    styles = getSampleStyleSheet()

    # Cor primária
    primary_color = colors.HexColor(config.primary_color)
    secondary_color = colors.HexColor(config.secondary_color)

    # Estilo customizado para título
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=config.font_size_heading1,
        textColor=primary_color,
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )

    # Estilo para subtítulo
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=config.font_size_heading2,
        textColor=secondary_color,
        spaceAfter=12,
        fontName='Helvetica-Bold'
    )

    # Estilo para seções
    section_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontSize=config.font_size_heading2,
        textColor=primary_color,
        spaceBefore=16,
        spaceAfter=10,
        fontName='Helvetica-Bold'
    )

    # Estilo para corpo do texto
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=config.font_size_normal,
        alignment=TA_JUSTIFY,
        spaceAfter=10,
        leading=config.font_size_normal * 1.4
    )

    # Lista de elementos
    elements = []

    # PÁGINA DE ROSTO
    if config.cover_enabled:
        cover_elements = []

        # Logo (se houver)
        # if config.cover_logo_url:
        #     try:
        #         logo = Image(config.cover_logo_url, width=3*inch, height=1.5*inch)
        #         cover_elements.append(logo)
        #         cover_elements.append(Spacer(1, 0.5*inch))
        #     except:
        #         pass

        cover_elements.append(Spacer(1, 2*inch))

        # Título da capa
        cover_title = config.cover_title or report.title
        cover_elements.append(Paragraph(cover_title, title_style))
        cover_elements.append(Spacer(1, 0.3*inch))

        # Subtítulo da capa
        if config.cover_subtitle or report.subtitle:
            cover_subtitle = config.cover_subtitle or report.subtitle
            cover_elements.append(Paragraph(cover_subtitle, subtitle_style))
            cover_elements.append(Spacer(1, 0.5*inch))

        # Nome do projeto
        if report.project_name:
            project_style = ParagraphStyle('Project', parent=body_style, fontSize=12, alignment=TA_CENTER)
            cover_elements.append(Paragraph(f"<b>Projeto:</b> {report.project_name}", project_style))
            cover_elements.append(Spacer(1, 0.2*inch))

        # Organização
        org_name = config.cover_organization or report.organization_name
        if org_name:
            org_style = ParagraphStyle('Org', parent=body_style, fontSize=14, alignment=TA_CENTER)
            cover_elements.append(Spacer(1, 1*inch))
            cover_elements.append(Paragraph(f"<b>{org_name}</b>", org_style))

        # Endereço e contato
        if config.cover_address:
            addr_style = ParagraphStyle('Addr', parent=body_style, fontSize=9, alignment=TA_CENTER)
            cover_elements.append(Spacer(1, 0.2*inch))
            cover_elements.append(Paragraph(config.cover_address, addr_style))

        if config.cover_contact:
            contact_style = ParagraphStyle('Contact', parent=body_style, fontSize=9, alignment=TA_CENTER)
            cover_elements.append(Spacer(1, 0.1*inch))
            cover_elements.append(Paragraph(config.cover_contact, contact_style))

        # Data
        date_style = ParagraphStyle('Date', parent=body_style, fontSize=10, alignment=TA_CENTER)
        cover_elements.append(Spacer(1, 0.5*inch))
        cover_elements.append(Paragraph(datetime.now().strftime('%B de %Y'), date_style))

        # Texto do rodapé da capa
        if config.cover_footer_text:
            cover_elements.append(Spacer(1, 0.3*inch))
            footer_style = ParagraphStyle('CoverFooter', parent=body_style, fontSize=8, alignment=TA_CENTER)
            cover_elements.append(Paragraph(config.cover_footer_text, footer_style))

        elements.extend(cover_elements)
        elements.append(PageBreak())

    # CONTEÚDO DO RELATÓRIO

    # Título principal
    elements.append(Paragraph(report.title, title_style))
    if report.subtitle:
        elements.append(Paragraph(report.subtitle, subtitle_style))

    elements.append(Spacer(1, 0.2*inch))

    # Informações básicas
    info_data = []
    if report.organization_name:
        info_data.append(['Organização:', report.organization_name])
    if report.project_name:
        info_data.append(['Projeto:', report.project_name])
    if report.report_type:
        info_data.append(['Tipo de Relatório:', report.report_type.capitalize()])
    if report.author:
        info_data.append(['Autor:', report.author])
    if report.period_start and report.period_end:
        period = f"{report.period_start.strftime('%d/%m/%Y')} a {report.period_end.strftime('%d/%m/%Y')}"
        info_data.append(['Período:', period])

    if info_data:
        info_table = Table(info_data, colWidths=[2.5*inch, 4*inch])
        info_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ]))
        elements.append(info_table)
        elements.append(Spacer(1, 0.3*inch))

    # Seções do relatório
    sections = [
        ('Resumo Executivo', report.executive_summary),
        ('Introdução', report.introduction),
        ('Objetivos', report.objectives),
        ('Metodologia', report.methodology),
        ('Atividades Realizadas', report.activities),
        ('Resultados Alcançados', report.results),
        ('Desafios e Dificuldades', report.challenges),
        ('Aprendizados', report.learnings),
        ('Próximos Passos', report.next_steps),
        ('Conclusão', report.conclusion),
    ]

    for section_title, section_content in sections:
        if section_content:
            elements.append(Paragraph(section_title, section_style))
            # Converter HTML para texto e criar parágrafos
            text_content = html_to_plain(section_content)
            for para in text_content.split('\n\n'):
                if para.strip():
                    elements.append(Paragraph(para.strip(), body_style))
            elements.append(Spacer(1, 0.15*inch))

    # Dados quantitativos
    if report.beneficiaries or report.budget_used or report.budget_total:
        elements.append(Paragraph('Dados Quantitativos', section_style))

        quant_data = []
        if report.beneficiaries:
            quant_data.append(['Beneficiários Atendidos:', str(report.beneficiaries)])
        if report.budget_total:
            quant_data.append(['Orçamento Total:', f'R$ {report.budget_total:,.2f}'])
        if report.budget_used:
            quant_data.append(['Orçamento Utilizado:', f'R$ {report.budget_used:,.2f}'])
            if report.budget_total:
                percentage = (report.budget_used / report.budget_total) * 100
                quant_data.append(['Percentual Utilizado:', f'{percentage:.1f}%'])

        quant_table = Table(quant_data, colWidths=[3*inch, 3.5*inch])
        quant_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('BACKGROUND', (0, 0), (-1, -1), colors.lightgrey),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ]))
        elements.append(quant_table)
        elements.append(Spacer(1, 0.2*inch))

    # Conteúdo adicional
    if report.additional_content:
        elements.append(Paragraph('Informações Adicionais', section_style))
        text_content = html_to_plain(report.additional_content)
        for para in text_content.split('\n\n'):
            if para.strip():
                elements.append(Paragraph(para.strip(), body_style))

    # Construir PDF
    doc.build(
        elements,
        canvasmaker=lambda *args, **kwargs: NumberedCanvas(
            *args,
            config=config.to_dict() if hasattr(config, 'to_dict') else config,
            **kwargs
        )
    )

    buffer.seek(0)
    return buffer
