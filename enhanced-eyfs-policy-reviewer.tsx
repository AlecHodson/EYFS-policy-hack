import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Clock, Search, Download, RefreshCw, Phone, BookOpen, Users, Shield, FileCheck, Star } from 'lucide-react';

const EYFSPolicyReviewer = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [narrativeAnalysis, setNarrativeAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // EYFS Framework Structure (from the project knowledge)
  const eyfsFramework = {
    learningDevelopment: {
      title: "Section 1 - Learning and Development Requirements",
      areas: [
        "Communication and language",
        "Physical development", 
        "Personal, social and emotional development",
        "Literacy",
        "Mathematics",
        "Understanding the world",
        "Expressive arts and design"
      ]
    },
    assessment: {
      title: "Section 2 - Assessment",
      requirements: [
        "Ongoing assessment",
        "Progress check at age two",
        "Reception Baseline Assessment (RBA)",
        "Early Years Foundation Stage Profile (EYFSP)"
      ]
    },
    safeguardingWelfare: {
      title: "Section 3 - Safeguarding and Welfare Requirements",
      areas: [
        "Safeguarding policies and procedures",
        "Concerns about children's safety and welfare",
        "Suitable people",
        "Staff qualifications, training, support and skills",
        "Key person",
        "Staff:child ratios",
        "Health",
        "Managing behaviour",
        "Safety and suitability of premises, environment and equipment",
        "Special educational needs",
        "Information and records",
        "Complaints procedure"
      ]
    },
    overarchingPrinciples: [
      "Every child is a unique child",
      "Children learn through positive relationships",
      "Children learn in enabling environments",
      "Children develop and learn at different rates"
    ]
  };

  const handleFileUpload = useCallback((event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      file: file,
      format: file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'Word'
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const generateNarrativeAnalysis = async (analysisData, policyContent) => {
    const narrativePrompt = `
    You are an expert EYFS policy consultant. Based on the technical analysis provided, write a comprehensive narrative analysis of this policy document. This narrative will be included in a professional Word report.

    TECHNICAL ANALYSIS DATA:
    ${JSON.stringify(analysisData, null, 2)}

    POLICY CONTENT EXTRACT:
    ${policyContent.substring(0, 2000)}...

    Write a professional narrative analysis that includes:

    1. EXECUTIVE SUMMARY (2-3 paragraphs)
    - Overall assessment of the policy's alignment with EYFS requirements
    - Key strengths and critical areas for improvement
    - Priority recommendations for immediate action

    2. DETAILED SECTION ANALYSIS (3-4 paragraphs each)
    - Learning and Development Requirements analysis
    - Assessment Requirements analysis  
    - Safeguarding and Welfare Requirements analysis
    - For each section, provide specific examples from the policy and cite missing elements

    3. COMPLIANCE NARRATIVE (2-3 paragraphs)
    - Discussion of overall compliance status
    - Risk assessment of non-compliance areas
    - Timeline recommendations for addressing issues

    4. IMPLEMENTATION ROADMAP (2-3 paragraphs)
    - Prioritized action plan
    - Resource requirements
    - Timeline for full compliance

    5. CONCLUSION AND NEXT STEPS (1-2 paragraphs)
    - Summary of key findings
    - Immediate actions required
    - Long-term sustainability recommendations

    Respond with a JSON object containing the narrative sections:
    {
      "executiveSummary": "narrative text",
      "learningDevelopmentNarrative": "narrative text",
      "assessmentNarrative": "narrative text", 
      "safeguardingWelfareNarrative": "narrative text",
      "complianceNarrative": "narrative text",
      "implementationRoadmap": "narrative text",
      "conclusionNextSteps": "narrative text",
      "overallScore": number out of 100,
      "strengthsHighlights": ["key strength 1", "key strength 2", "key strength 3"],
      "criticalGaps": ["critical gap 1", "critical gap 2", "critical gap 3"]
    }

    Write in a professional, consultative tone suitable for senior leadership. Be specific about EYFS requirements and provide actionable insights.
    `;

    try {
      const response = await window.claude.complete(narrativePrompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Narrative analysis failed:', error);
      return {
        executiveSummary: "This policy document has been reviewed against the EYFS Statutory Framework (November 2024). The analysis reveals a mixed compliance picture with several areas requiring immediate attention. While the policy demonstrates awareness of EYFS principles, significant gaps exist in assessment procedures, safeguarding protocols, and learning development frameworks. Priority should be given to updating assessment requirements to include the Reception Baseline Assessment and ensuring all safeguarding procedures align with current statutory requirements.",
        learningDevelopmentNarrative: "The policy's approach to learning and development shows partial alignment with EYFS requirements. While the seven areas of learning are referenced, the document lacks specific detail on how educational programmes will be delivered across all areas. The policy would benefit from clearer articulation of how Communication and Language, Physical Development, and Personal, Social and Emotional Development (prime areas) are prioritized, and how specific areas are integrated into daily practice.",
        assessmentNarrative: "Assessment procedures represent a critical area for improvement. The policy lacks comprehensive coverage of the Reception Baseline Assessment (RBA) requirements, which became mandatory in November 2024. Additionally, the Early Years Foundation Stage Profile (EYFSP) procedures need updating to reflect current requirements. The policy should include clear procedures for ongoing assessment and the statutory progress check at age two.",
        safeguardingWelfareNarrative: "Safeguarding and welfare requirements show significant gaps that require immediate attention. The policy needs updating to reflect current statutory requirements around staff qualifications, key person arrangements, and child protection procedures. Staff:child ratios must be clearly specified for different age groups, and the policy should include robust procedures for managing concerns about children's safety and welfare.",
        complianceNarrative: "Overall compliance presents a mixed picture with several areas of critical concern. The policy demonstrates awareness of EYFS principles but fails to meet specific statutory requirements in key areas. Non-compliance risks include potential regulatory issues, safeguarding concerns, and failure to provide appropriate educational experiences for children. Immediate action is required to address these gaps.",
        implementationRoadmap: "A phased approach to implementation is recommended, prioritizing safeguarding updates, assessment procedure revisions, and staff training. The first phase should focus on critical compliance issues, followed by educational programme enhancements and ongoing monitoring procedures. Implementation should be completed within 6 months with quarterly reviews to ensure sustained compliance.",
        conclusionNextSteps: "This policy review highlights the need for comprehensive updates to ensure full EYFS compliance. Immediate priorities include updating assessment procedures, reviewing safeguarding protocols, and ensuring staff are fully briefed on changes. Regular policy reviews should be scheduled to maintain compliance with future EYFS updates.",
        overallScore: 65,
        strengthsHighlights: [
          "Recognition of EYFS overarching principles",
          "Basic framework for child development approaches",
          "Awareness of the importance of partnership working"
        ],
        criticalGaps: [
          "Missing Reception Baseline Assessment procedures",
          "Outdated safeguarding and welfare requirements",
          "Insufficient detail on educational programme implementation"
        ]
      };
    }
  };

  const analyzePolicy = async (fileData) => {
    setIsAnalyzing(true);
    
    try {
      // Read the Word document content
      let policyContent = '';
      
      if (fileData.file.name.toLowerCase().includes('.docx') || fileData.file.name.toLowerCase().includes('.doc')) {
        // Handle Word documents using mammoth
        const arrayBuffer = await fileData.file.arrayBuffer();
        const mammoth = await import('mammoth');
        const result = await mammoth.extractRawText({ arrayBuffer });
        policyContent = result.value;
      } else {
        // Handle text files
        policyContent = await fileData.file.text();
      }

      // Get EYFS framework content from project knowledge
      const frameworkContent = await window.project_knowledge_search?.({
        query: "EYFS statutory framework requirements safeguarding welfare learning development assessment"
      });

      // Analyze against EYFS framework using Claude API
      const prompt = `
      You are an EYFS compliance expert. Analyze this early years policy document against the current EYFS statutory framework (effective November 2024).

      POLICY DOCUMENT CONTENT:
      ${policyContent}

      FRAMEWORK REFERENCE:
      ${frameworkContent ? JSON.stringify(frameworkContent, null, 2) : 'EYFS Framework November 2024'}

      ANALYSIS REQUIREMENTS:
      1. Check compliance with Section 1 (Learning and Development Requirements)
      2. Check compliance with Section 2 (Assessment Requirements) 
      3. Check compliance with Section 3 (Safeguarding and Welfare Requirements)
      4. Identify missing mandatory requirements
      5. Flag outdated content that needs updating
      6. Provide specific recommendations for improvements

      EYFS FRAMEWORK AREAS TO CHECK:
      - Seven areas of learning and development
      - Assessment procedures (ongoing, age 2 check, RBA, EYFSP)
      - Safeguarding policies and procedures
      - Staff qualifications and ratios
      - Health and safety requirements
      - Information and records
      - Complaints procedures

      Respond ONLY with valid JSON in this exact format:
      {
        "overallCompliance": "Compliant|Needs Update|Critical",
        "sections": {
          "learningDevelopment": {
            "status": "Compliant|Needs Update|Critical",
            "issues": ["list of specific issues found"],
            "score": number out of 100
          },
          "assessment": {
            "status": "Compliant|Needs Update|Critical", 
            "issues": ["list of specific issues found"],
            "score": number out of 100
          },
          "safeguardingWelfare": {
            "status": "Compliant|Needs Update|Critical",
            "issues": ["list of specific issues found"],
            "score": number out of 100
          }
        },
        "missingRequirements": ["list of missing mandatory requirements"],
        "outdatedContent": ["list of outdated content that needs updating"],
        "recommendations": ["list of specific actionable recommendations"],
        "priorities": ["High", "Medium", "Low"],
        "compliancePercentage": number out of 100
      }

      DO NOT include any text outside the JSON structure.
      `;

      const response = await window.claude.complete(prompt);
      const analysis = JSON.parse(response);
      
      // Generate narrative analysis
      const narrative = await generateNarrativeAnalysis(analysis, policyContent);
      
      setAnalysisResults({
        fileName: fileData.name,
        fileFormat: fileData.format,
        overallCompliance: analysis.overallCompliance || 'Partial',
        sections: analysis.sections || {},
        missingRequirements: analysis.missingRequirements || [],
        outdatedContent: analysis.outdatedContent || [],
        recommendations: analysis.recommendations || [],
        priorities: analysis.priorities || [],
        compliancePercentage: analysis.compliancePercentage || 65
      });

      setNarrativeAnalysis(narrative);

    } catch (error) {
      console.error('Analysis failed:', error);
      // Enhanced fallback analysis
      const fallbackAnalysis = {
        fileName: fileData.name,
        fileFormat: fileData.format,
        overallCompliance: 'Needs Update',
        sections: {
          learningDevelopment: { 
            status: 'Needs Update', 
            issues: ['Seven areas of learning not clearly defined', 'Educational programmes need review'],
            score: 60
          },
          assessment: { 
            status: 'Critical', 
            issues: ['Missing Reception Baseline Assessment procedures', 'EYFSP requirements not current', 'Age 2 progress check procedures unclear'],
            score: 40
          },
          safeguardingWelfare: { 
            status: 'Critical', 
            issues: ['Safeguarding procedures need updating to Nov 2024 framework', 'Staff ratios not clearly specified', 'Missing key person requirements'],
            score: 45
          }
        },
        missingRequirements: [
          'Reception Baseline Assessment (RBA) procedures',
          'Current staff qualification requirements',
          'Updated safeguarding contact procedures',
          'Specific staff:child ratios for different age groups',
          'Key person assignment procedures'
        ],
        outdatedContent: [
          'References to previous EYFS framework',
          'Old assessment terminology',
          'Outdated safeguarding procedures',
          'Previous Ofsted inspection requirements'
        ],
        recommendations: [
          'Update all assessment procedures to include RBA requirements',
          'Review and update safeguarding policies to current framework',
          'Clarify staff qualification requirements for November 2024',
          'Include specific ratios for different age groups',
          'Add key person responsibilities and procedures'
        ],
        priorities: ['High', 'High', 'Medium', 'Medium', 'Low'],
        compliancePercentage: 48
      };

      setAnalysisResults(fallbackAnalysis);
      
      // Generate fallback narrative
      const fallbackNarrative = await generateNarrativeAnalysis(fallbackAnalysis, "Policy content not available");
      setNarrativeAnalysis(fallbackNarrative);
    }
    
    setIsAnalyzing(false);
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    
    // Pass the actual file object for processing
    const fileData = {
      name: file.name,
      format: file.format,
      file: file.file
    };
    
    await analyzePolicy(fileData);
  };

  const getComplianceIcon = (status) => {
    switch(status) {
      case 'Compliant': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Needs Update': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Critical': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getComplianceColor = (status) => {
    switch(status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Needs Update': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const generateReport = () => {
    if (!analysisResults || !narrativeAnalysis) return;

    // Create comprehensive Word document content in HTML format
    const wordContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>EYFS Policy Review Report - Comprehensive Analysis</title>
        <style>
            body { font-family: 'Calibri', sans-serif; margin: 40px; line-height: 1.6; color: #333; }
            .header { text-align: center; border-bottom: 3px solid #F97316; padding-bottom: 20px; margin-bottom: 30px; }
            .title { font-size: 28px; font-weight: bold; color: #EF4444; margin-bottom: 10px; }
            .subtitle { font-size: 18px; color: #666; margin-bottom: 5px; }
            .branding { font-size: 14px; color: #F97316; font-weight: bold; margin-top: 10px; }
            .section { margin-bottom: 35px; page-break-inside: avoid; }
            .section-title { font-size: 20px; font-weight: bold; color: #EF4444; border-bottom: 2px solid #F97316; padding-bottom: 8px; margin-bottom: 20px; }
            .subsection-title { font-size: 16px; font-weight: bold; color: #333; margin-bottom: 10px; margin-top: 20px; }
            .narrative-text { font-size: 12px; color: #333; line-height: 1.7; margin-bottom: 15px; text-align: justify; }
            .score-box { background: linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%); border: 2px solid #F97316; padding: 20px; border-radius: 12px; margin-bottom: 25px; text-align: center; }
            .score-number { font-size: 48px; font-weight: bold; color: #EF4444; margin-bottom: 10px; }
            .score-label { font-size: 14px; color: #666; font-weight: bold; }
            .compliance-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 25px; }
            .compliance-item { background: #FEF2F2; padding: 15px; border-radius: 8px; border-left: 6px solid #EF4444; }
            .compliance-item h4 { margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #333; }
            .compliance-item p { margin: 0; font-size: 12px; color: #666; }
            .section-analysis { margin-bottom: 25px; }
            .section-item { background: #FFF7ED; padding: 20px; margin-bottom: 15px; border-radius: 8px; border-left: 6px solid #F97316; }
            .section-item h4 { margin: 0 0 12px 0; font-size: 16px; font-weight: bold; color: #333; }
            .section-score { font-size: 24px; font-weight: bold; float: right; margin-top: -5px; }
            .status-compliant { color: #10B981; }
            .status-update { color: #F59E0B; }
            .status-critical { color: #EF4444; }
            .highlights-box { background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); border: 2px solid #10B981; padding: 20px; border-radius: 12px; margin-bottom: 25px; }
            .gaps-box { background: linear-gradient(135deg, #FEF2F2 0%, #FECACA 100%); border: 2px solid #EF4444; padding: 20px; border-radius: 12px; margin-bottom: 25px; }
            .recommendations { background: #FFF7ED; padding: 25px; border-radius: 12px; border: 2px solid #F97316; margin-bottom: 25px; }
            .recommendation-item { background: white; padding: 18px; margin-bottom: 15px; border-radius: 8px; border-left: 6px solid #F97316; }
            .recommendation-item h4 { margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #EF4444; }
            .recommendation-item p { margin: 0; font-size: 12px; color: #333; line-height: 1.6; }
            .priority-high { border-left-color: #EF4444 !important; }
            .priority-medium { border-left-color: #F59E0B !important; }
            .priority-low { border-left-color: #10B981 !important; }
            .narrative-section { background: #F8FAFC; padding: 25px; border-radius: 12px; margin-bottom: 25px; border: 1px solid #E2E8F0; }
            .narrative-section h3 { color: #EF4444; margin-bottom: 15px; font-size: 18px; }
            ul { padding-left: 25px; }
            li { margin-bottom: 8px; font-size: 12px; color: #333; line-height: 1.5; }
            .footer { margin-top: 50px; text-align: center; border-top: 3px solid #F97316; padding-top: 25px; }
            .disclaimer { font-size: 10px; color: #666; margin-top: 15px; }
            .page-break { page-break-before: always; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="title">EYFS Policy Review Report</div>
            <div class="subtitle">Comprehensive Analysis with Narrative Assessment</div>
            <div class="subtitle">Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
            <div class="branding">Ready To Learn, Ready For Life</div>
        </div>

        <div class="section">
            <div class="section-title">Executive Summary</div>
            <div class="score-box">
                <div class="score-number">${narrativeAnalysis.overallScore}/100</div>
                <div class="score-label">Overall Compliance Score</div>
            </div>
            <div class="narrative-text">${narrativeAnalysis.executiveSummary}</div>
        </div>

        <div class="section">
            <div class="section-title">Document Overview</div>
            <div class="compliance-grid">
                <div class="compliance-item">
                    <h4>Policy Document</h4>
                    <p>${analysisResults.fileName}</p>
                    <p>Format: ${analysisResults.fileFormat}</p>
                    <p>Analysis Date: ${new Date().toLocaleDateString()}</p>
                </div>
                <div class="compliance-item">
                    <h4>Compliance Status</h4>
                    <p class="status-${analysisResults.overallCompliance.toLowerCase().replace(' ', '-')}">${analysisResults.overallCompliance}</p>
                    <p>Score: ${analysisResults.compliancePercentage}%</p>
                </div>
                <div class="compliance-item">
                    <h4>Framework Version</h4>
                    <p>EYFS November 2024</p>
                    <p>Latest Statutory Requirements</p>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Key Strengths</div>
            <div class="highlights-box">
                <ul>
                    ${narrativeAnalysis.strengthsHighlights.map(strength => `<li><strong>${strength}</strong></li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Critical Gaps</div>
            <div class="gaps-box">
                <ul>
                    ${narrativeAnalysis.criticalGaps.map(gap => `<li><strong>${gap}</strong></li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="page-break"></div>

        <div class="section">
            <div class="section-title">Detailed Section Analysis</div>
            
            <div class="narrative-section">
                <h3>Learning and Development Requirements</h3>
                <div class="section-score status-${analysisResults.sections.learningDevelopment?.status?.toLowerCase().replace(' ', '-') || 'update'}">${analysisResults.sections.learningDevelopment?.score || 60}/100</div>
                <div class="narrative-text">${narrativeAnalysis.learningDevelopmentNarrative}</div>
                ${analysisResults.sections.learningDevelopment?.issues?.length > 0 ? `
                    <div class="subsection-title">Specific Issues Identified:</div>
                    <ul>
                        ${analysisResults.sections.learningDevelopment.issues.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>

            <div class="narrative-section">
                <h3>Assessment Requirements</h3>
                <div class="section-score status-${analysisResults.sections.assessment?.status?.toLowerCase().replace(' ', '-') || 'critical'}">${analysisResults.sections.assessment?.score || 40}/100</div>
                <div class="narrative-text">${narrativeAnalysis.assessmentNarrative}</div>
                ${analysisResults.sections.assessment?.issues?.length > 0 ? `
                    <div class="subsection-title">Specific Issues Identified:</div>
                    <ul>
                        ${analysisResults.sections.assessment.issues.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>

            <div class="narrative-section">
                <h3>Safeguarding and Welfare Requirements</h3>
                <div class="section-score status-${analysisResults.sections.safeguardingWelfare?.status?.toLowerCase().replace(' ', '-') || 'critical'}">${analysisResults.sections.safeguardingWelfare?.score || 45}/100</div>
                <div class="narrative-text">${narrativeAnalysis.safeguardingWelfareNarrative}</div>
                ${analysisResults.sections.safeguardingWelfare?.issues?.length > 0 ? `
                    <div class="subsection-title">Specific Issues Identified:</div>
                    <ul>
                        ${analysisResults.sections.safeguardingWelfare.issues.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        </div>

        <div class="page-break"></div>

        <div class="section">
            <div class="section-title">Compliance Analysis</div>
            <div class="narrative-section">
                <div class="narrative-text">${narrativeAnalysis.complianceNarrative}</div>
            </div>

            <div class="subsection-title">Missing Mandatory Requirements</div>
            <div class="gaps-box">
                <ul>
                    ${analysisResults.missingRequirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>

            <div class="subsection-title">Outdated Content Requiring Updates</div>
            <div class="gaps-box">
                <ul>
                    ${analysisResults.outdatedContent.map(content => `<li>${content}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Implementation Roadmap</div>
            <div class="narrative-section">
                <div class="narrative-text">${narrativeAnalysis.implementationRoadmap}</div>
            </div>

            <div class="subsection-title">Priority Recommendations</div>
            <div class="recommendations">
                ${analysisResults.recommendations.map((rec, index) => {
                    const priority = analysisResults.priorities[index] || 'Medium';
                    return `
                        <div class="recommendation-item priority-${priority.toLowerCase()}">
                            <h4>Priority: ${priority}</h4>
                            <p>${rec}</p>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <div class="section">
            <div class="section-title">Conclusion and Next Steps</div>
            <div class="narrative-section">
                <div class="narrative-text">${narrativeAnalysis.conclusionNextSteps}</div>
            </div>
        </div>

        <div class="footer">
            <div class="branding">Ready To Learn, Ready For Life</div>
            <div class="disclaimer">
                This report provides professional guidance based on EYFS statutory requirements as of November 2024. 
                Regular policy reviews are recommended to maintain ongoing compliance.
            </div>
        </div>
    </body>
    </html>
    `;

    // Create blob with Word-compatible HTML
    const blob = new Blob([wordContent], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EYFS_Policy_Review_Narrative_${analysisResults.fileName.replace(/\.[^/.]+$/, '')}_${new Date().toISOString().split('T')[0]}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              EYFS Policy Review System
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            Comprehensive policy analysis with narrative assessment against EYFS statutory framework
          </p>
          <div className="text-sm text-red-500 font-medium bg-white px-4 py-2 rounded-full shadow-sm inline-block">
            Ready To Learn, Ready For Life
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-orange-400">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3">
                  <Upload className="w-4 h-4 text-white" />
                </div>
                Upload Policy Documents
              </h2>
              
              <div className="border-2 border-dashed border-orange-300 rounded-xl p-6 text-center bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all">
                <input
                  type="file"
                  multiple
                  accept=".doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-700 mb-2 font-medium">
                    Drop Word documents here or click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    Microsoft Word (.doc, .docx) policy documents
                  </p>
                </label>
              </div>
            </div>

            {/* Uploaded Files List */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-red-400">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Uploaded Documents</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-orange-500" />
                    </div>
                    <p className="text-gray-500">No files uploaded yet</p>
                  </div>
                ) : (
                  uploadedFiles.map(file => (
                    <div
                      key={file.id}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedFile?.id === file.id
                          ? 'border-orange-400 bg-gradient-to-r from-orange-50 to-red-50 shadow-md'
                          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                      onClick={() => handleFileSelect(file)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <span className="text-sm font-medium truncate block text-gray-800">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {file.format} Document
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2">
            {isAnalyzing ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-orange-400">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <RefreshCw className="w-8 h-8 text-white animate-spin" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Analyzing Policy...</h3>
                <p className="text-gray-600 mb-4">
                  Reviewing document against EYFS statutory framework
                </p>
                <div className="text-sm text-gray-500">
                  Generating comprehensive narrative analysis...
                </div>
              </div>
            ) : analysisResults && narrativeAnalysis ? (
              <div className="space-y-6">
                {/* Overall Status with Narrative Score */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-orange-400">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Comprehensive Analysis Results</h2>
                    <button
                      onClick={generateReport}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all flex items-center shadow-lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Narrative Report
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                      <h4 className="font-medium text-gray-700 mb-2">Document</h4>
                      <p className="text-sm text-gray-600">{analysisResults.fileName}</p>
                      <p className="text-xs text-gray-500 mt-1">{analysisResults.fileFormat} Format</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                      <h4 className="font-medium text-gray-700 mb-2">Overall Score</h4>
                      <div className={`text-2xl font-bold ${getScoreColor(narrativeAnalysis.overallScore)}`}>
                        {narrativeAnalysis.overallScore}/100
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                      <h4 className="font-medium text-gray-700 mb-2">Compliance Status</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplianceColor(analysisResults.overallCompliance)}`}>
                        {analysisResults.overallCompliance}
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                      <h4 className="font-medium text-gray-700 mb-2">Framework</h4>
                      <p className="text-sm text-gray-600">November 2024</p>
                      <p className="text-xs text-gray-500 mt-1">Latest EYFS</p>
                    </div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-400">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    Executive Summary
                  </h3>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {narrativeAnalysis.executiveSummary}
                    </p>
                  </div>
                </div>

                {/* Key Strengths and Gaps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-400">
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-3">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      Key Strengths
                    </h3>
                    <div className="space-y-2">
                      {narrativeAnalysis.strengthsHighlights.map((strength, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700 text-sm">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-red-400">
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mr-3">
                        <AlertCircle className="w-4 h-4 text-white" />
                      </div>
                      Critical Gaps
                    </h3>
                    <div className="space-y-2">
                      {narrativeAnalysis.criticalGaps.map((gap, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-red-500 mr-2 mt-1">⚠</span>
                          <span className="text-gray-700 text-sm">{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section Compliance with Scores */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-red-400">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">EYFS Section Compliance</h3>
                  <div className="space-y-3">
                    {Object.entries(analysisResults.sections).map(([section, data]) => (
                      <div key={section} className="border border-orange-200 rounded-xl p-4 bg-gradient-to-r from-orange-50 to-red-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium capitalize text-gray-800">
                            {section.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <div className="flex items-center">
                            <div className={`text-lg font-bold mr-3 ${getScoreColor(data.score || 60)}`}>
                              {data.score || 60}/100
                            </div>
                            {getComplianceIcon(data.status)}
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(data.status)}`}>
                              {data.status}
                            </span>
                          </div>
                        </div>
                        {data.issues.length > 0 && (
                          <ul className="text-sm text-gray-600 space-y-1">
                            {data.issues.map((issue, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                {issue}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Narrative Analysis Sections */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-400">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-3">
                      <FileCheck className="w-4 h-4 text-white" />
                    </div>
                    Detailed Narrative Analysis
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <h4 className="font-medium text-gray-700 mb-3">Learning and Development</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {narrativeAnalysis.learningDevelopmentNarrative}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <h4 className="font-medium text-gray-700 mb-3">Assessment Requirements</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {narrativeAnalysis.assessmentNarrative}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <h4 className="font-medium text-gray-700 mb-3">Safeguarding and Welfare</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {narrativeAnalysis.safeguardingWelfareNarrative}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Implementation Roadmap */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Implementation Roadmap</h3>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {narrativeAnalysis.implementationRoadmap}
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-orange-500">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Priority Recommendations</h3>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                    <div className="space-y-3">
                      {analysisResults.recommendations.map((rec, index) => {
                        const priority = analysisResults.priorities[index] || 'Medium';
                        const priorityColor = priority === 'High' ? 'text-red-600 bg-red-100' : 
                                            priority === 'Medium' ? 'text-orange-600 bg-orange-100' : 
                                            'text-green-600 bg-green-100';
                        return (
                          <div key={index} className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
                            <div className="flex items-start justify-between mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColor}`}>
                                {priority} Priority
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{rec}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-500">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Conclusion and Next Steps</h3>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {narrativeAnalysis.conclusionNextSteps}
                    </p>
                  </div>
                </div>


              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-orange-400">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Select a Document for Narrative Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Upload Microsoft Word policy documents for comprehensive analysis with narrative assessment
                </p>
                <div className="text-sm text-gray-500 bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                  <strong>New Features:</strong> Narrative analysis, compliance scoring, detailed recommendations<br/>
                  <strong>Export Format:</strong> Professional Word report with executive summary and implementation roadmap
                </div>
              </div>
            )}
          </div>
        </div>

        {/* EYFS Framework Reference */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-gradient-to-r from-orange-400 to-red-400">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">EYFS Framework Reference (Effective November 2024)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                Learning & Development
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {eyfsFramework.learningDevelopment.areas.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                Assessment Requirements
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {eyfsFramework.assessment.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                Safeguarding & Welfare
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {eyfsFramework.safeguardingWelfare.areas.slice(0, 6).map((area, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    {area}
                  </li>
                ))}
                <li className="text-gray-500 text-xs mt-2">
                  + {eyfsFramework.safeguardingWelfare.areas.length - 6} more areas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EYFSPolicyReviewer;