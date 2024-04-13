import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/navigation.js";

const PageTransition = ({children}) => {
    const router = useRouter();

    return (
        <AnimatePresence wait>
            <motion.div
                key={router.route}
                initial="initialState"
                animate="animateState"
                exit="exitState"
                transition={{
                    type: "tween",
                    duration: 0.5
                }}
                variants={{
                    initialState: {
                        x: "100vw"
                    },
                    animateState: {
                        x: 0
                    },
                    exitState: {
                        x: "-100vw"
                    }
                }}
                className="min-h-screen w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
