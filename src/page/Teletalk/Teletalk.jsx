import BasicTab from "../../components/BasicTab";

const Teletalk = () => {
    var internet = 1
    var minute = 2
    var combo = 2
    return (
        <section>
            <BasicTab internet={internet}  minute={minute} combo={combo} className='teletalk_color' />
        </section>
    );
};

export default Teletalk;