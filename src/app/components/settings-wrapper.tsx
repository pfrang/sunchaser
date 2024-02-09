export const SettingsWrapper = ({ children }) => {
  return (
    <div className="fixed right-6 top-2 z-50 flex w-fit flex-col items-end gap-4">
      {children}
    </div>
  );
};
