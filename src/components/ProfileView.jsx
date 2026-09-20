import { useState, useRef } from "react";
import {
  User as UserIcon,
  Mail,
  GraduationCap,
  BookOpen,
  Target,
  Save,
  Check,
  Camera,
  Upload,
  Trash2,
  AlertCircle,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export const ProfileView = ({ currentUser, onUpdateProfile }) => {
  const [name, setName] = useState(currentUser?.name || "");
  const [college, setCollege] = useState(
    currentUser?.college || "National Institute of Technology",
  );
  const [branch, setBranch] = useState(
    currentUser?.branch || "Computer Science & Engineering",
  );
  const [targetExam, setTargetExam] = useState(
    currentUser?.targetExam || "GATE CSE & Campus Placements",
  );
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [isDragging, setIsDragging] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [imageNotice, setImageNotice] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Process and optimize image uploaded from local PC or Laptop
  const processImageFile = (file) => {
    if (!file) return;
    setImageError(null);
    setImageNotice(null);

    // Validate mime type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/bmp",
    ];
    if (!validTypes.includes(file.type) && !file.type.startsWith("image/")) {
      setImageError("Please upload an image file (JPG, PNG, WebP, GIF, or SVG).");
      return;
    }

    // Validate size (max 10MB input from PC)
    if (file.size > 10 * 1024 * 1024) {
      setImageError("Selected image is too large. Please choose an image under 10 MB.");
      return;
    }

    setProcessingImage(true);

    const reader = new FileReader();
    reader.onerror = () => {
      setImageError("Failed to read file from your device. Please try again.");
      setProcessingImage(false);
    };

    reader.onload = (e) => {
      const resultDataUrl = e.target.result;

      // For SVG or GIF, preserve directly
      if (file.type === "image/svg+xml" || file.type === "image/gif") {
        setAvatar(resultDataUrl);
        setImageNotice(`Photo selected (${Math.round(file.size / 1024)} KB). Click "Save Profile Changes" to apply.`);
        setProcessingImage(false);
        return;
      }

      // Resize & center-crop raster images to 320x320 high-res avatar via Canvas
      const img = new Image();
      img.onerror = () => {
        setAvatar(resultDataUrl);
        setProcessingImage(false);
      };
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const size = 320;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            // Anti-aliasing quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // Calculate center-crop box
            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;

            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
            const optimized = canvas.toDataURL("image/jpeg", 0.9);
            setAvatar(optimized);
            const approxKb = Math.round(optimized.length * (3 / 4) / 1024);
            setImageNotice(`Photo loaded and optimized (${approxKb} KB). Click "Save Profile Changes" to save.`);
          } else {
            setAvatar(resultDataUrl);
          }
        } catch {
          setAvatar(resultDataUrl);
        } finally {
          setProcessingImage(false);
        }
      };
      img.src = resultDataUrl;
    };

    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
    // reset input value so re-uploading the same file still triggers onChange
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleRemovePhoto = () => {
    setAvatar("");
    setImageNotice("Reset to default avatar generator. Click Save to apply.");
    setImageError(null);
  };

  const handleSelectDicebearPreset = (style) => {
    const newPreset = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(name || "User")}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
    setAvatar(newPreset);
    setImageNotice("Avatar preset selected. Click Save to apply.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setImageNotice(null);
    try {
      await onUpdateProfile({
        name,
        college,
        branch,
        targetExam,
        avatar,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3e3);
    } catch (err) {
      console.error("Profile update failed:", err);
      setImageError(err.message || "Failed to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  const currentDisplayAvatar =
    avatar ||
    currentUser?.avatar ||
    `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || "User")}`;

  const isCustomUploadedPhoto =
    avatar && (avatar.startsWith("data:image/") || !avatar.includes("dicebear.com"));

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Hidden file input for PC / Laptop local file browser */}
      <input
        ref={fileInputRef}
        id="profile-avatar-file-input"
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-colors">
        {/* Interactive Avatar Area with Drag & Drop & Hover Overlay */}
        <div className="flex flex-col items-center gap-2">
          <div
            id="avatar-drop-zone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            title="Click or drag an image here to change profile photo from your device"
            className={`relative group cursor-pointer rounded-full p-1 transition-all duration-200 ${
              isDragging
                ? "ring-4 ring-indigo-500 scale-105 bg-indigo-50 dark:bg-indigo-950/50"
                : "hover:ring-4 hover:ring-indigo-200 dark:hover:ring-indigo-900/60"
            }`}
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900/50 shadow-md bg-slate-100 dark:bg-slate-800 relative">
              <img
                src={currentDisplayAvatar}
                alt={name || "Profile"}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover Camera Overlay */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
                <Camera className="w-6 h-6 mb-1 text-white" />
                <span className="text-[11px] font-bold leading-tight">
                  Change Photo
                </span>
                <span className="text-[9px] text-slate-300 font-medium">
                  from PC / Laptop
                </span>
              </div>

              {/* Loading spinner during canvas optimization */}
              {processingImage && (
                <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center text-white">
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
                </div>
              )}
            </div>

            {/* Quick Camera Action Badge */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              title="Upload photo from PC/Laptop"
              className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-white dark:border-slate-900 shadow-md absolute bottom-1 right-1 flex items-center justify-center transition cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Click photo to browse
          </span>
        </div>

        {/* User Identity Info */}
        <div className="text-center sm:text-left space-y-1.5 flex-1 pt-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {name || "Student Candidate"}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50 uppercase tracking-wide">
              {currentUser?.role || "student"}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentUser?.email}</span>
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Registered Candidate:{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {currentUser?.createdAt
                ? new Date(currentUser.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Active Member"}
            </span>
          </p>

          {/* Quick Photo Upload & Reset Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <button
              id="upload-photo-btn"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo from PC / Laptop</span>
            </button>

            {isCustomUploadedPhoto && (
              <button
                id="reset-avatar-btn"
                type="button"
                onClick={handleRemovePhoto}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-900 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Custom Photo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Upload Drop Zone & Preset Selector Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 transition-colors">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Profile Photo Upload &amp; Customization</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select an image file from your PC or Laptop desktop/folders, or drag and drop it below.
          </p>
        </div>

        {/* Drag & Drop Visual Target Area */}
        <div
          id="profile-drop-area"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? "border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/60 scale-[1.01]"
              : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/30 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
            <Upload className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Drag and drop your profile photo here, or{" "}
              <span className="text-indigo-600 dark:text-indigo-400 underline underline-offset-2">
                browse files on this device
              </span>
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Supports PNG, JPG, JPEG, WEBP, GIF, or SVG (Up to 10 MB). Automatically cropped &amp; optimized.
            </p>
          </div>
        </div>

        {/* Status Alerts for Image Processing */}
        {imageError && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{imageError}</span>
          </div>
        )}

        {imageNotice && (
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              {imageNotice}
            </span>
          </div>
        )}

        {/* Alternative Avatar Presets */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Or choose an illustrated avatar style:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "bottts", label: "Robot" },
              { id: "avataaars", label: "Student" },
              { id: "micah", label: "Modern" },
              { id: "lorelei", label: "Artistic" },
              { id: "adventurer", label: "Scholar" },
            ].map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectDicebearPreset(preset.id)}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            Academic &amp; Profile Preferences
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure your target exam syllabus, institution credentials, and display preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 block">Full Name</label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="profile-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                College / University
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="profile-college-input"
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Branch / Major
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="profile-branch-input"
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 block">
              Primary Target Exam
            </label>
            <div className="relative">
              <Target className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="profile-target-exam-input"
                type="text"
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                placeholder="e.g. GATE CSE, TCS NQT, Infosys, Amazon SDE, CAT"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Mock tests and recommended question pools will prioritize this curriculum.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Profile &amp; Photo saved successfully!
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">
                All changes are saved to your PrepZone account.
              </span>
            )}

            <button
              id="save-profile-btn"
              type="submit"
              disabled={saving || processingImage}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Profile Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProfileView;
