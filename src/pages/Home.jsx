import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../config/motion.js'
import { CustomButton } from '../components/index.js'
import state from '../store'

export const Home = () => {
	const snap = useSnapshot(state)
	return <AnimatePresence>
		{snap.intro && (
			<motion.div className="home" {...slideAnimation('left')}>
				<motion.header {...slideAnimation('down')}>
					<img src="./threejs.png"
					     className="w-8 h-8 object-contain"
					     alt="logo"
					/>
				</motion.header>
				<motion.div className="home-content"
				            {...headContainerAnimation}
				>
					<motion.div {...headTextAnimation}>
						<h1 className="head-text">
							VA
							<br className="x1:block hidden" />
							SA
						</h1>
					</motion.div>
					<motion.div {...headContentAnimation} className="flex flex-col gap-S">
					</motion.div>
					<CustomButton
						title="在线制作"
						type="filled"
						handleClick={() => state.intro = false}
						customStyles="w-fit px-4 py-2.5 font-bold text-sm"
					/>
				</motion.div>
			</motion.div>
		)}
	</AnimatePresence>
}
