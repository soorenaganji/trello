import Image from "next/image";
import loadingGif from "@/public/loading.svg"
const Loading = () => {
    return (
        <div>
           <Image src={loadingGif} />
        </div>
    );
}

export default Loading;