import axios from 'axios'
import styles from './App.module.css'
import { useState, useEffect } from 'react'

function App() {
  const [resp, setResp] = useState([])

  const required = async () => {
    const retorno = await axios.get('https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json')
    return retorno
  }

  console.log(resp)

  useEffect(() => {
    setInterval(async () => {
      const retorno = await required().then((response) => response.data.cand)
      setResp(retorno)  
    }, 10000)
  }, [])
  
  return (
    <div className={styles.tableContainer}>
      
      <table className={styles.table}>
        
        <thead>
          
          <tr className={styles.trTitle}>
            
            <th className={styles.background}>Colocação</th>
            <th className={styles.background}>Nome do Candidato</th>
            <th className={styles.background}>% Votos Válidos</th>
          
          </tr>
        </thead>
        
        <tbody>
          {resp.map((item) => {
            return (              
              <tr className={styles.trBody}>
                <td className={styles.background}>{item.seq}</td>
                <td className={styles.background}>{item.nm}</td>
                <td className={styles.background}>{item.pvap}</td>
              </tr>
              
            )
          })}
       </tbody>
       
      </table>
    </div>
   
  )
}

export default App
