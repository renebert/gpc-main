import { FC } from "react";
import Loading from "../loading";
import "./style.scss";

const Preloader: FC = () => {
    return (
        <div className="index">
            <Loading />
        </div>
    );
};

export default Preloader;
