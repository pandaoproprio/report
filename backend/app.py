from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from sqlalchemy.orm import Session
from datetime import datetime
from io import BytesIO
import os

from database import engine, SessionLocal, init_db
from models import Report, ReportConfig, Base
from pdf_generator import generate_report_pdf

app = Flask(__name__)
CORS(app)

init_db()

# Criar configuração padrão se não existir
def create_default_config():
    db = SessionLocal()
    try:
        existing = db.query(ReportConfig).filter(ReportConfig.is_default == True).first()
        if not existing:
            default_config = ReportConfig(
                name="Configuração Padrão",
                is_default=True,
                cover_enabled=True,
                cover_title="Relatório de Atividades",
                cover_organization="Nome da Organização",
                cover_footer_text="Este documento é confidencial e destinado exclusivamente ao uso interno.",
                header_enabled=True,
                header_text="Relatório de Atividades",
                header_align="center",
                footer_enabled=True,
                footer_text="",
                footer_align="center",
                footer_show_page_number=True,
                footer_page_format="Página {page} de {total}",
                page_size="A4",
                primary_color="#2c3e50",
                secondary_color="#3498db"
            )
            db.add(default_config)
            db.commit()
    finally:
        db.close()

create_default_config()


@app.route('/')
def home():
    return jsonify({
        "message": "Sistema de Relatórios para ONGs",
        "version": "2.0.0",
        "features": ["Relatórios narrativos", "Campos editáveis", "Cabeçalho/Rodapé customizáveis", "Página de rosto"]
    })


# ================== RELATÓRIOS ==================

@app.route('/api/reports', methods=['GET'])
def get_reports():
    db = SessionLocal()
    try:
        report_type = request.args.get('type')
        status = request.args.get('status')

        query = db.query(Report)

        if report_type:
            query = query.filter(Report.report_type == report_type)
        if status:
            query = query.filter(Report.status == status)

        reports = query.order_by(Report.created_at.desc()).all()
        return jsonify([report.to_dict() for report in reports])
    finally:
        db.close()


@app.route('/api/reports', methods=['POST'])
def create_report():
    db = SessionLocal()
    try:
        data = request.json

        # Obter configuração padrão se não especificada
        config_id = data.get('config_id')
        if not config_id:
            default_config = db.query(ReportConfig).filter(ReportConfig.is_default == True).first()
            if default_config:
                config_id = default_config.id

        report = Report(
            title=data.get('title'),
            subtitle=data.get('subtitle'),
            project_name=data.get('project_name'),
            organization_name=data.get('organization_name'),
            report_type=data.get('report_type'),
            period_start=datetime.fromisoformat(data['period_start']) if data.get('period_start') else None,
            period_end=datetime.fromisoformat(data['period_end']) if data.get('period_end') else None,
            author=data.get('author'),
            status=data.get('status', 'draft'),
            executive_summary=data.get('executive_summary'),
            introduction=data.get('introduction'),
            objectives=data.get('objectives'),
            methodology=data.get('methodology'),
            activities=data.get('activities'),
            results=data.get('results'),
            challenges=data.get('challenges'),
            learnings=data.get('learnings'),
            next_steps=data.get('next_steps'),
            conclusion=data.get('conclusion'),
            additional_content=data.get('additional_content'),
            beneficiaries=data.get('beneficiaries', 0),
            budget_used=data.get('budget_used', 0.0),
            budget_total=data.get('budget_total', 0.0),
            config_id=config_id
        )
        db.add(report)
        db.commit()
        db.refresh(report)
        return jsonify(report.to_dict()), 201
    finally:
        db.close()


@app.route('/api/reports/<int:report_id>', methods=['GET'])
def get_report(report_id):
    db = SessionLocal()
    try:
        report = db.query(Report).filter(Report.id == report_id).first()
        if not report:
            return jsonify({"error": "Relatório não encontrado"}), 404
        return jsonify(report.to_dict())
    finally:
        db.close()


@app.route('/api/reports/<int:report_id>', methods=['PUT'])
def update_report(report_id):
    db = SessionLocal()
    try:
        report = db.query(Report).filter(Report.id == report_id).first()
        if not report:
            return jsonify({"error": "Relatório não encontrado"}), 404

        data = request.json

        # Atualizar campos básicos
        if 'title' in data:
            report.title = data['title']
        if 'subtitle' in data:
            report.subtitle = data['subtitle']
        if 'project_name' in data:
            report.project_name = data['project_name']
        if 'organization_name' in data:
            report.organization_name = data['organization_name']
        if 'report_type' in data:
            report.report_type = data['report_type']
        if 'author' in data:
            report.author = data['author']
        if 'status' in data:
            report.status = data['status']

        # Datas
        if 'period_start' in data and data['period_start']:
            report.period_start = datetime.fromisoformat(data['period_start'])
        if 'period_end' in data and data['period_end']:
            report.period_end = datetime.fromisoformat(data['period_end'])

        # Conteúdo narrativo
        if 'executive_summary' in data:
            report.executive_summary = data['executive_summary']
        if 'introduction' in data:
            report.introduction = data['introduction']
        if 'objectives' in data:
            report.objectives = data['objectives']
        if 'methodology' in data:
            report.methodology = data['methodology']
        if 'activities' in data:
            report.activities = data['activities']
        if 'results' in data:
            report.results = data['results']
        if 'challenges' in data:
            report.challenges = data['challenges']
        if 'learnings' in data:
            report.learnings = data['learnings']
        if 'next_steps' in data:
            report.next_steps = data['next_steps']
        if 'conclusion' in data:
            report.conclusion = data['conclusion']
        if 'additional_content' in data:
            report.additional_content = data['additional_content']

        # Dados quantitativos
        if 'beneficiaries' in data:
            report.beneficiaries = data['beneficiaries']
        if 'budget_used' in data:
            report.budget_used = data['budget_used']
        if 'budget_total' in data:
            report.budget_total = data['budget_total']

        if 'config_id' in data:
            report.config_id = data['config_id']

        report.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(report)
        return jsonify(report.to_dict())
    finally:
        db.close()


@app.route('/api/reports/<int:report_id>', methods=['DELETE'])
def delete_report(report_id):
    db = SessionLocal()
    try:
        report = db.query(Report).filter(Report.id == report_id).first()
        if not report:
            return jsonify({"error": "Relatório não encontrado"}), 404

        db.delete(report)
        db.commit()
        return jsonify({"message": "Relatório deletado com sucesso"})
    finally:
        db.close()


@app.route('/api/reports/<int:report_id>/pdf', methods=['GET'])
def export_report_pdf(report_id):
    db = SessionLocal()
    try:
        report = db.query(Report).filter(Report.id == report_id).first()
        if not report:
            return jsonify({"error": "Relatório não encontrado"}), 404

        # Obter configuração
        config = report.config
        if not config:
            config = db.query(ReportConfig).filter(ReportConfig.is_default == True).first()

        if not config:
            return jsonify({"error": "Configuração não encontrada"}), 404

        # Gerar PDF
        buffer = generate_report_pdf(report, config)

        filename = f"relatorio_{report.id}_{datetime.now().strftime('%Y%m%d')}.pdf"

        return send_file(
            buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=filename
        )
    finally:
        db.close()


@app.route('/api/stats', methods=['GET'])
def get_stats():
    db = SessionLocal()
    try:
        total_reports = db.query(Report).count()

        by_status = {}
        statuses = db.query(Report.status).distinct().all()
        for (status,) in statuses:
            count = db.query(Report).filter(Report.status == status).count()
            by_status[status or 'unknown'] = count

        by_type = {}
        types = db.query(Report.report_type).distinct().all()
        for (report_type,) in types:
            count = db.query(Report).filter(Report.report_type == report_type).count()
            by_type[report_type or 'uncategorized'] = count

        total_beneficiaries = db.query(Report).with_entities(Report.beneficiaries).all()
        sum_beneficiaries = sum([b[0] or 0 for b in total_beneficiaries])

        return jsonify({
            "total_reports": total_reports,
            "by_status": by_status,
            "by_type": by_type,
            "total_beneficiaries": sum_beneficiaries
        })
    finally:
        db.close()


# ================== CONFIGURAÇÕES ==================

@app.route('/api/configs', methods=['GET'])
def get_configs():
    db = SessionLocal()
    try:
        configs = db.query(ReportConfig).order_by(ReportConfig.is_default.desc(), ReportConfig.name).all()
        return jsonify([config.to_dict() for config in configs])
    finally:
        db.close()


@app.route('/api/configs', methods=['POST'])
def create_config():
    db = SessionLocal()
    try:
        data = request.json

        config = ReportConfig(
            name=data.get('name'),
            cover_enabled=data.get('cover_enabled', True),
            cover_logo_url=data.get('cover_logo_url'),
            cover_title=data.get('cover_title'),
            cover_subtitle=data.get('cover_subtitle'),
            cover_organization=data.get('cover_organization'),
            cover_address=data.get('cover_address'),
            cover_contact=data.get('cover_contact'),
            cover_footer_text=data.get('cover_footer_text'),
            header_enabled=data.get('header_enabled', True),
            header_text=data.get('header_text'),
            header_logo_url=data.get('header_logo_url'),
            header_align=data.get('header_align', 'center'),
            header_show_page_number=data.get('header_show_page_number', True),
            footer_enabled=data.get('footer_enabled', True),
            footer_text=data.get('footer_text'),
            footer_align=data.get('footer_align', 'center'),
            footer_show_page_number=data.get('footer_show_page_number', True),
            footer_page_format=data.get('footer_page_format', 'Página {page} de {total}'),
            page_size=data.get('page_size', 'A4'),
            page_margin_top=data.get('page_margin_top', 2.0),
            page_margin_bottom=data.get('page_margin_bottom', 2.0),
            page_margin_left=data.get('page_margin_left', 2.5),
            page_margin_right=data.get('page_margin_right', 2.5),
            font_family=data.get('font_family', 'Helvetica'),
            font_size_normal=data.get('font_size_normal', 11),
            font_size_heading1=data.get('font_size_heading1', 18),
            font_size_heading2=data.get('font_size_heading2', 14),
            primary_color=data.get('primary_color', '#2c3e50'),
            secondary_color=data.get('secondary_color', '#3498db'),
            is_default=data.get('is_default', False)
        )

        # Se for marcado como padrão, desmarcar outros
        if config.is_default:
            db.query(ReportConfig).update({ReportConfig.is_default: False})

        db.add(config)
        db.commit()
        db.refresh(config)
        return jsonify(config.to_dict()), 201
    finally:
        db.close()


@app.route('/api/configs/<int:config_id>', methods=['GET'])
def get_config(config_id):
    db = SessionLocal()
    try:
        config = db.query(ReportConfig).filter(ReportConfig.id == config_id).first()
        if not config:
            return jsonify({"error": "Configuração não encontrada"}), 404
        return jsonify(config.to_dict())
    finally:
        db.close()


@app.route('/api/configs/<int:config_id>', methods=['PUT'])
def update_config(config_id):
    db = SessionLocal()
    try:
        config = db.query(ReportConfig).filter(ReportConfig.id == config_id).first()
        if not config:
            return jsonify({"error": "Configuração não encontrada"}), 404

        data = request.json

        # Atualizar todos os campos
        for key, value in data.items():
            if hasattr(config, key) and key not in ['id', 'created_at', 'updated_at']:
                setattr(config, key, value)

        # Se for marcado como padrão, desmarcar outros
        if data.get('is_default'):
            db.query(ReportConfig).filter(ReportConfig.id != config_id).update({ReportConfig.is_default: False})

        config.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(config)
        return jsonify(config.to_dict())
    finally:
        db.close()


@app.route('/api/configs/<int:config_id>', methods=['DELETE'])
def delete_config(config_id):
    db = SessionLocal()
    try:
        config = db.query(ReportConfig).filter(ReportConfig.id == config_id).first()
        if not config:
            return jsonify({"error": "Configuração não encontrada"}), 404

        if config.is_default:
            return jsonify({"error": "Não é possível deletar a configuração padrão"}), 400

        db.delete(config)
        db.commit()
        return jsonify({"message": "Configuração deletada com sucesso"})
    finally:
        db.close()


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
