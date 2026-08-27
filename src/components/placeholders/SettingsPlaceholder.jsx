export default function SettingsPlaceholder({ profile, onApplyProfile, onBack }) {
  return (
    <div className="p-6">
      <p>Settings</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="border px-4 py-2"
          onClick={() => onApplyProfile(profile)}
        >
          Apply
        </button>
        <button type="button" className="border px-4 py-2" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
