import React from 'react';

const TestWayOfCode = () => {
  return (
    <div className="way-of-code-container">
      <style>{`
        :root {
          --background-color: #FAF9F5;
          --text-color: rgba(0, 0, 0, 0.85);
          --rubin-slate: #1F1E1D;
          --rubin-gray: #87867F;
          --rubin-ivory-med: #F0EEE6;
          --font-family-base: "Goudy Old Style", "Garamond", serif;
          --font-size-base: 22px;
          --line-height-base: 1.5;
          --letter-spacing-base: 0.02em;
        }

        .way-of-code-container {
          background-color: var(--background-color);
          min-height: 100vh;
          padding: 60px 100px;
          font-family: var(--font-family-base);
          color: var(--text-color);
        }

        .case-study-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-bottom: 120px;
        }

        .case-study-visual {
          background-color: var(--rubin-ivory-med);
          width: 100%;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .visual-placeholder {
          width: 80%;
          height: 80%;
          background: linear-gradient(135deg, #d0d0c0 0%, #e8e6dc 100%);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Courier Prime", monospace;
          font-size: 14px;
          color: var(--rubin-gray);
        }

        .case-study-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .case-study-content h2 {
          margin: 0 !important;
          font-size: 22px !important;
          font-weight: 600 !important;
          line-height: 1.2 !important;
          color: var(--rubin-slate) !important;
          letter-spacing: 0.05em !important;
        }

        .case-study-content h3 {
          margin: 0 !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          font-style: italic !important;
          color: var(--rubin-gray) !important;
          letter-spacing: 0.02em !important;
        }

        .case-study-content p {
          margin: 0;
          font-size: var(--font-size-base);
          line-height: var(--line-height-base);
          letter-spacing: var(--letter-spacing-base);
          color: var(--text-color);
          max-width: 600px;
        }

        .case-study-row:hover {
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        @media (max-width: 1024px) {
          .way-of-code-container {
            padding: 40px 50px;
          }

          .case-study-row {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .case-study-content h2 {
            font-size: 36px;
          }
        }

        @media (max-width: 768px) {
          .way-of-code-container {
            padding: 30px 24px;
          }

          .case-study-content h2 {
            font-size: 28px;
          }

          .case-study-content p {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="case-study-row">
        {/* LEFT: Visual Demo */}
        <div className="case-study-visual">
          <div className="visual-placeholder">
            [Video Demo Area]
          </div>
        </div>

        {/* RIGHT: Content Info */}
        <div className="case-study-content">
          <h2 style={{
            fontSize: '22px',
            fontWeight: '600',
            lineHeight: '1.2',
            color: 'var(--rubin-slate)',
            letterSpacing: '0.05em',
            margin: 0
          }}>Order Processing System</h2>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '400',
            fontStyle: 'italic',
            color: 'var(--rubin-gray)',
            letterSpacing: '0.02em',
            margin: 0
          }}>Automation and Workflow Optimization</h3>
          <p>
            This project involved designing and implementing a comprehensive order processing automation system that reduced manual touchpoints by 85%. The solution integrated multiple systems and utilized advanced workflow orchestration to streamline operations.
          </p>
          <p>
            Key achievements include reducing processing time from 2 hours to 15 minutes, implementing real-time tracking, and creating comprehensive error handling mechanisms that improved system reliability to 99.9%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestWayOfCode;
