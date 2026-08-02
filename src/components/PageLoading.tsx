export default function PageLoading({
  dark = false,
  inline = false,
}: {
  dark?: boolean;
  inline?: boolean;
}) {
  return (
    <div className={`page-loading${dark ? 'dark' : ''}${inline ? 'page-loading-inline' : ''}`}>
      <div className="page-loading-spinner" />
      <div className="page-loading-brand">
        Warung Coding TV<span>.</span>
      </div>
    </div>
  );
}
