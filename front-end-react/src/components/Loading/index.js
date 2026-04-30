import styles from "@/components/Loading/Loading.module.css";

const Loading = ({loading}) => { // recebera o resultado de loading através de props
  return (
    <>
      <div className={loading ? styles.loading : styles.done}>
        <img src="../../images/loading.gif" alt="Carregando" />
        <p>Carregando...</p>
      </div>
    </>
  );
};

export default Loading;
