import { useState, useRef } from 'react';
import { Upload, FileText, Image as ImageIcon, Check, X, Loader2 } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'success' | 'error';
}

export function MedicalReportUpload() {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    age: '',
    medicalNotes: '',
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        status: 'uploading',
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
      
      // Simulate upload
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === newFile.id ? { ...f, status: 'success' } : f)
        );
      }, 1500);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    // Simulate submission
    setTimeout(() => {
      setSubmitStatus('success');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setFormData({
          patientName: '',
          patientId: '',
          age: '',
          medicalNotes: '',
        });
        setUploadedFiles([]);
      }, 3000);
    }, 2000);
  };

  const isFormValid = formData.patientName && formData.patientId && formData.age && uploadedFiles.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Upload Medical Report</h2>
          <p className="text-sm text-slate-500 mt-1">Submit patient medical reports and documentation</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Patient Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Patient Name */}
              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-slate-700 mb-2">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="patientName"
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Patient ID */}
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-slate-700 mb-2">
                  Patient ID <span className="text-red-500">*</span>
                </label>
                <input
                  id="patientId"
                  type="text"
                  required
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  placeholder="e.g., PT-10240"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                id="age"
                type="number"
                required
                min="0"
                max="150"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Enter age"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Medical Notes */}
            <div>
              <label htmlFor="medicalNotes" className="block text-sm font-medium text-slate-700 mb-2">
                Medical Notes
              </label>
              <textarea
                id="medicalNotes"
                rows={4}
                value={formData.medicalNotes}
                onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                placeholder="Enter any relevant medical notes or observations..."
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* File Upload Area */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Upload Documents</h3>
            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-300 bg-slate-50 hover:border-slate-400'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleChange}
                className="hidden"
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                
                <div>
                  <p className="text-slate-900 font-medium mb-1">
                    Drop files here or click to browse
                  </p>
                  <p className="text-sm text-slate-500">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Select Files
                </button>
              </div>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-900">Uploaded Files ({uploadedFiles.length})</h3>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                      {file.type.includes('pdf') ? (
                        <FileText className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                      <p className="text-xs text-slate-500">{file.size}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {file.status === 'uploading' && (
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                      )}
                      {file.status === 'success' && (
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                      {file.status === 'error' && (
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                          <X className="w-4 h-4 text-red-600" />
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="p-1 rounded hover:bg-slate-200 transition-colors"
                      >
                        <X className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={!isFormValid || submitStatus === 'submitting'}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                isFormValid && submitStatus !== 'submitting'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              {submitStatus === 'submitting' ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Report...
                </span>
              ) : (
                'Submit Medical Report'
              )}
            </button>
          </div>
        </form>

        {/* Status/Confirmation Section */}
        {submitStatus === 'success' && (
          <div className="mx-6 mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-green-900">Report Submitted Successfully</h4>
                <p className="text-sm text-green-700 mt-1">
                  Medical report for {formData.patientName} (ID: {formData.patientId}) has been uploaded and processed.
                </p>
                <p className="text-sm text-green-600 mt-2">
                  Reference ID: MR-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-red-900">Submission Failed</h4>
                <p className="text-sm text-red-700 mt-1">
                  There was an error submitting the report. Please try again or contact support.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
