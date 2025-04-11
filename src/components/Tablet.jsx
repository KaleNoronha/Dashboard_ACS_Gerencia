import React from 'react'
import Echarts4 from './Echarts4';
import Echarts3 from './Echarts3';
import Echarts2 from './Echarts2';


const tablet = () => {
    return (
        <>
            <table style={{ width: '100%' }}>
                <tr>
                    <td style={{ width: '25%', height: '300px', border: '1px solid black' }}> 

                    </td>
                    <td style={{ width: '50%' }}>
                        <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                            <Echarts4/>
                        </div>
                    </td>
                    <td style={{ width: '25%', border: '1px solid black' }}></td>
                </tr>
            </table>
            <table style={{ width: '100%' }}>
                <tr>
                    <td style={{ width: '50%', height: '400px' }}>
                        <div style={{ justifyContent:'center',alignItems:'center',display:'flex',margin:'60px 40px 0px 0px'}}> 
                            <Echarts2 />
                        </div>
                    </td>
                    <td style={{ width: '50%'}}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center', width:'100%', height:'100%'}}>
                            <Echarts3 />
                        </div>
                    </td>
                </tr>
            </table>
        </>
    )
}

export default tablet;