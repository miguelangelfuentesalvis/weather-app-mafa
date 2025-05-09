export default function UnitToggle({ unit, onToggle }) {
  return (
    <div className="flex justify-end mb-5">
      <button
        onClick={() => unit !== 'metric' && onToggle()}
        className={`w-10 h-10 rounded-full font-bold cursor-pointer ml-2
          ${unit === 'metric' ? 'bg-[#e7e7eb] text-[#110e3c]' : 'bg-[#585676] text-[#e7e7eb]'}`}
      >
        °C
      </button>
      <button
        onClick={() => unit !== 'imperial' && onToggle()}
        className={`w-10 h-10 rounded-full font-bold cursor-pointer ml-2
          ${unit === 'imperial' ? 'bg-[#e7e7eb] text-[#110e3c]' : 'bg-[#585676] text-[#e7e7eb]'}`}
      >
        °F
      </button>
    </div>
  );
}
