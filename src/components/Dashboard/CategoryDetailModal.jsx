// src/components/Dashboard/CategoryDetailModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const COLORS = {
  darkBlue: '#1a3a5c',
  brightGreen: '#92D050',
  brightRed: '#C0504D',
  lightBlue: '#e3f2fd',
  white: '#ffffff'
};

export default function CategoryDetailModal({ show, onHide, category }) {
  if (!category) return null;

  const diff = (category.auditValue - category.selfAudit).toFixed(2);
  const diffColor = diff >= 0 ? COLORS.brightGreen : COLORS.brightRed;
  const diffIcon = diff >= 0 ? '▲' : '▼';

  const selfAuditCount = category.selfAuditCount || 0;
  const auditCount = category.auditCount || 0;
  const totalQuestions = category.totalQuestions || 0;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton style={{ background: COLORS.darkBlue, color: COLORS.white }}>
        <Modal.Title>
          Детали категории
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Раздел — увеличенный шрифт */}
        {category.sectionName && (
          <div style={{ 
            marginBottom: '15px', 
            paddingBottom: '10px', 
            borderBottom: `2px solid ${COLORS.lightBlue}` 
          }}>
            <span style={{ 
              fontSize: '18px', 
              color: COLORS.darkBlue, 
              opacity: 0.7,
              fontWeight: '500'
            }}>
              Раздел:
            </span>
            <span style={{ 
              fontSize: '20px', 
              color: COLORS.darkBlue, 
              fontWeight: '700',
              marginLeft: '8px'
            }}>
              {category.sectionName}
            </span>
          </div>
        )}

        <h4 className="mb-3" style={{ color: COLORS.darkBlue, fontSize: '22px', fontWeight: '700' }}>{category.name}</h4>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card" style={{ background: COLORS.lightBlue }}>
              <div className="card-body text-center">
                <h6 style={{ color: COLORS.darkBlue, opacity: 0.7, fontSize: '14px' }}>Результат самоаудита</h6>
                <h2 style={{ color: COLORS.darkBlue, fontSize: '32px', fontWeight: '700' }}>
                  {category.selfAudit.toFixed(2)} / 5.00
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card" style={{ background: COLORS.lightBlue }}>
              <div className="card-body text-center">
                <h6 style={{ color: COLORS.darkBlue, opacity: 0.7, fontSize: '14px' }}>Результат аудита</h6>
                <h2 style={{ color: COLORS.darkBlue, fontSize: '32px', fontWeight: '700' }}>
                  {category.auditValue.toFixed(2)} / 5.00
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <div className="card" style={{ background: COLORS.lightBlue }}>
              <div className="card-body text-center">
                <h6 style={{ color: COLORS.darkBlue, opacity: 0.7, fontSize: '14px' }}>Самоаудит (мероприятия)</h6>
                <h2 style={{ color: COLORS.darkBlue, fontSize: '32px', fontWeight: '700' }}>
                  {selfAuditCount} / {totalQuestions}
                </h2>
                <small style={{ color: COLORS.darkBlue, opacity: 0.6, fontSize: '12px' }}>выполнено из запланированных</small>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card" style={{ background: COLORS.lightBlue }}>
              <div className="card-body text-center">
                <h6 style={{ color: COLORS.darkBlue, opacity: 0.7, fontSize: '14px' }}>Аудит (мероприятия)</h6>
                <h2 style={{ color: COLORS.darkBlue, fontSize: '32px', fontWeight: '700' }}>
                  {auditCount} / {totalQuestions}
                </h2>
                <small style={{ color: COLORS.darkBlue, opacity: 0.6, fontSize: '12px' }}>выполнено из запланированных</small>
              </div>
            </div>
          </div>
        </div>
        
        <div className="alert" style={{ background: `${diffColor}20`, border: `1px solid ${diffColor}` }}>
          <div className="text-center">
            <span style={{ fontSize: '28px', color: diffColor }}>{diffIcon}</span>
            <h5 style={{ color: diffColor, fontSize: '18px', fontWeight: '600' }}>
              {diff >= 0 ? 'Положительная динамика' : 'Требует внимания'}
            </h5>
            <p className="mb-0" style={{ fontSize: '14px' }}>
              Разница между аудитом и самоаудитом: <strong style={{ color: diffColor }}>{diff >= 0 ? `+${diff}` : diff}</strong>
            </p>
          </div>
        </div>
        
        <div className="mt-3">
          <h6 style={{ color: COLORS.darkBlue, fontWeight: '600', fontSize: '16px' }}>Рекомендации:</h6>
          <ul style={{ color: COLORS.darkBlue, opacity: 0.8, fontSize: '14px' }}>
            {diff >= 0 ? (
              <>
                <li>Продолжайте поддерживать высокий уровень</li>
                <li>Тиражируйте успешные практики на другие категории</li>
              </>
            ) : (
              <>
                <li>Проведите дополнительный анализ причин расхождения</li>
                <li>Разработайте план корректирующих мероприятий</li>
              </>
            )}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} style={{ background: COLORS.darkBlue, border: 'none', fontSize: '14px' }}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}