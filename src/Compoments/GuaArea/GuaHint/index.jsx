import { useState, useEffect } from 'react';
import './index.css';



export function GuaResultHint(props) {
    const { pos } = props;
    const [isClosed, setIsClosed] = useState(props.isClosed||true)

    return (
        <div className='gua-hint result' style={{top: pos.top, left: pos.left}}>
            <span>已記錄!</span>
        </div>
    );
}
// export function GuaHint(props) {
//     return (
//         <div className='gua-hint-container'>
//             <div className='gua-hint result'>
//                 <span>已記錄下的結果會放置於此</span>
//             </div>
//             {/* 這裡是 GuaHint 元件內容 */}
//         </div>
//     );
// }
