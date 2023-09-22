const Spinner = (props: any) => {
  const { white } = props;

  return (
    <div className={`loader ${white && 'white'}`}></div>
  );
}

export default Spinner;