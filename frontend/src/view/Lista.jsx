import React from "react";

const Lista = () => {
  return (
    <div style={{width:'50%',display:'flex',flexDirection:'column',justifyContent:'center'}}>
      <h5 style={{textAlign:'center'}}>Transacciones</h5>
      <table>
        <tr >
          <td>Estado </td>
          <td>Q TRX</td>
          <td>%Q TRX</td>
        </tr>
      </table>
    </div>
  );
};

export default Lista;
