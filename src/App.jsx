import axios from 'axios'
import styles from './App.module.css'
import { useState, useEffect } from 'react'

function App() {
  const [resp, setResp] = useState([])

  const required = async () => {
    const retorno = await axios.get('https://resultados.tse.jus.br/oficial/app/87-es2015.51685ccc0b9070bde473.js')
    return retorno
  }

  useEffect(() => {
    setInterval(async () => {
      const retorno = await required().then((response) => response.data.cand)
      setResp(retorno)  
    }, 30000)
  }, [])

  console.log(resp)
  
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
