const Menubar = (props: any) => {
  const { handler } = props;

  return (
    <div className="flex md:hidden flex-col justify-between w-8 h-8 py-1" onClick={handler}>
      <span className="w-full h-0.5 bg-white" />
      <span className="w-full h-0.5 bg-white" />
      <span className="w-full h-0.5 bg-white" />
    </div>
  );
}

export default Menubar;