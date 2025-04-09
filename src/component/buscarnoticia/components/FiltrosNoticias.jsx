import Tooltip from "component/common/tooltip"
import { useState } from "react";

const FiltrosNoticias = ({sortDirection,setSort,lastNews,setLast}) => {

   
    const [isLast30Days, setIsLast30Days] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCalendarOpen, setIsModalCalendarOpen] = useState(false);

    const openMobileModal = () => setIsMobileModalOpen(true);

    
    return (
        <>
            <div className="buscarnoticias__input-btn-continer">
                <Tooltip tooltip="tooltip-bottom" clase={`${sortDirection ? '' : 'active-border'}`} text={'Primer / Ultima'}>
                    <img className="buscarnoticias__input-btn-img" src="/images/buscarnoticias/lastweek.svg" alt="" width={24} onClick={()=>{setSort(!sortDirection)}} />
                </Tooltip>
                <Tooltip tooltip="tooltip-bottom" clase={`${lastNews ? 'active-border' : ''}`} text={'30 Dias'}>
                    <img className="buscarnoticias__input-btn-img" src="/images/buscarnoticias/lastmonth.svg" alt="" width={24} onClick={()=>{setLast(!lastNews)}}/>
                </Tooltip>
                <Tooltip tooltip="tooltip-bottom" clase={`buscarnoticias__input-btn-img ${isMobile ? 'mobile-only' : ''}`} text={'Categorias'}>
                    <img tooltip="tooltip-bottom" className="buscarnoticias__input-btn-img" onClick={() => setIsModalOpen(true)} src="/images/buscarnoticias/categorias.svg" alt="" width={24} />
                </Tooltip>

                <Tooltip tooltip="tooltip-bottom" clase={`buscarnoticias__input-btn-img ${isMobile ? 'mobile-only' : ''}`} text={'Calendario'}>
                    <img
                        className="buscarnoticias__input-btn-img"
                        onClick={() => setIsModalCalendarOpen(true)}
                        src="/images/buscarnoticias/calendar.svg"
                        alt=""
                        width={24}
                    />
                </Tooltip>

                {/* <Tooltip clase={`buscarnoticias__input-btn-img ${isMobile ? 'larger-only' : ''}`} text={'Categorias Mobile'}>
                    <img
                        className={`buscarnoticias__input-btn-img`}
                        onClick={openMobileModal}
                        src="/images/buscarnoticias/categorias.svg"
                        alt=""
                        width={24}
                    />
                </Tooltip>

                <Tooltip clase={`buscarnoticias__input-btn-img ${isMobile ? 'larger-only' : ''}`} text={'Calendario Mobile'}>
                    <img
                        className={`buscarnoticias__input-btn-img`}
                        onClick={() => setIsModalCalendarMobileOpen(true)}
                        src="/images/buscarnoticias/calendar.svg"
                        alt=""
                        width={24}
                    />
                </Tooltip> */}
            </div>
        </>
    )
}

export default FiltrosNoticias