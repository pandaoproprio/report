from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    subtitle = Column(String(300))
    project_name = Column(String(200))
    organization_name = Column(String(200))
    report_type = Column(String(100))  # mensal, trimestral, anual, atividade, impacto
    period_start = Column(DateTime)
    period_end = Column(DateTime)
    author = Column(String(200))
    status = Column(String(50), default="draft")  # draft, review, approved, published

    # Conteúdo narrativo
    executive_summary = Column(Text)  # Resumo executivo
    introduction = Column(Text)  # Introdução
    objectives = Column(Text)  # Objetivos
    methodology = Column(Text)  # Metodologia
    activities = Column(Text)  # Atividades realizadas
    results = Column(Text)  # Resultados alcançados
    challenges = Column(Text)  # Desafios e dificuldades
    learnings = Column(Text)  # Aprendizados
    next_steps = Column(Text)  # Próximos passos
    conclusion = Column(Text)  # Conclusão
    additional_content = Column(Text)  # Conteúdo adicional

    # Dados quantitativos
    beneficiaries = Column(Integer, default=0)
    budget_used = Column(Float, default=0.0)
    budget_total = Column(Float, default=0.0)

    # Configurações do documento
    config_id = Column(Integer, ForeignKey('report_configs.id'))
    config = relationship("ReportConfig", back_populates="reports")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "project_name": self.project_name,
            "organization_name": self.organization_name,
            "report_type": self.report_type,
            "period_start": self.period_start.isoformat() if self.period_start else None,
            "period_end": self.period_end.isoformat() if self.period_end else None,
            "author": self.author,
            "status": self.status,
            "executive_summary": self.executive_summary,
            "introduction": self.introduction,
            "objectives": self.objectives,
            "methodology": self.methodology,
            "activities": self.activities,
            "results": self.results,
            "challenges": self.challenges,
            "learnings": self.learnings,
            "next_steps": self.next_steps,
            "conclusion": self.conclusion,
            "additional_content": self.additional_content,
            "beneficiaries": self.beneficiaries,
            "budget_used": self.budget_used,
            "budget_total": self.budget_total,
            "config_id": self.config_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }


class ReportConfig(Base):
    __tablename__ = "report_configs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)

    # Página de rosto
    cover_enabled = Column(Boolean, default=True)
    cover_logo_url = Column(String(500))
    cover_title = Column(String(300))
    cover_subtitle = Column(String(300))
    cover_organization = Column(String(200))
    cover_address = Column(Text)
    cover_contact = Column(Text)
    cover_footer_text = Column(Text)

    # Cabeçalho
    header_enabled = Column(Boolean, default=True)
    header_text = Column(String(300))
    header_logo_url = Column(String(500))
    header_align = Column(String(20), default="center")  # left, center, right
    header_show_page_number = Column(Boolean, default=True)

    # Rodapé
    footer_enabled = Column(Boolean, default=True)
    footer_text = Column(String(300))
    footer_align = Column(String(20), default="center")  # left, center, right
    footer_show_page_number = Column(Boolean, default=True)
    footer_page_format = Column(String(50), default="Página {page} de {total}")

    # Configurações de página
    page_size = Column(String(20), default="A4")  # A4, Letter
    page_margin_top = Column(Float, default=2.0)  # em cm
    page_margin_bottom = Column(Float, default=2.0)
    page_margin_left = Column(Float, default=2.5)
    page_margin_right = Column(Float, default=2.5)

    # Fontes e estilos
    font_family = Column(String(50), default="Helvetica")
    font_size_normal = Column(Integer, default=11)
    font_size_heading1 = Column(Integer, default=18)
    font_size_heading2 = Column(Integer, default=14)

    # Cores
    primary_color = Column(String(7), default="#2c3e50")  # Hex color
    secondary_color = Column(String(7), default="#3498db")

    is_default = Column(Boolean, default=False)

    reports = relationship("Report", back_populates="config")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "cover_enabled": self.cover_enabled,
            "cover_logo_url": self.cover_logo_url,
            "cover_title": self.cover_title,
            "cover_subtitle": self.cover_subtitle,
            "cover_organization": self.cover_organization,
            "cover_address": self.cover_address,
            "cover_contact": self.cover_contact,
            "cover_footer_text": self.cover_footer_text,
            "header_enabled": self.header_enabled,
            "header_text": self.header_text,
            "header_logo_url": self.header_logo_url,
            "header_align": self.header_align,
            "header_show_page_number": self.header_show_page_number,
            "footer_enabled": self.footer_enabled,
            "footer_text": self.footer_text,
            "footer_align": self.footer_align,
            "footer_show_page_number": self.footer_show_page_number,
            "footer_page_format": self.footer_page_format,
            "page_size": self.page_size,
            "page_margin_top": self.page_margin_top,
            "page_margin_bottom": self.page_margin_bottom,
            "page_margin_left": self.page_margin_left,
            "page_margin_right": self.page_margin_right,
            "font_family": self.font_family,
            "font_size_normal": self.font_size_normal,
            "font_size_heading1": self.font_size_heading1,
            "font_size_heading2": self.font_size_heading2,
            "primary_color": self.primary_color,
            "secondary_color": self.secondary_color,
            "is_default": self.is_default,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
