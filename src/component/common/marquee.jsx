import Marquee from "react-fast-marquee";

const MarqueeHeader = () => {
    const marqueeData = Array.from({length:16}, (_, index) => ({
        img:"/images/iconos-btn/wsp3.svg",
        texto: "+543834000000"
    }))
    return (
        <Marquee speed={60}>
            <div className="marquee__container">
                {marqueeData.map((mdata, index) => (
                        <a href="" className="marquee__item" key={index}>
                            <img className="marquee__icon" src={mdata.img} alt="Whatsapp Icon" />
                            <p className="marquee__phone">{mdata.texto}</p>
                        </a>
                ))}
            </div>
        </Marquee>
    )
}

export default MarqueeHeader;