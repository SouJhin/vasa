import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { DecalTypes, EditorTabs, FilterTabs } from '../config/constants.js'
import { slideAnimation } from '../config/motion.js'
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components'
import state from '../store/index.js'
import { reader } from '../config/helpers.js'


const Customizer = () => {
	const snap = useSnapshot(state)
	const [file, setFile] = useState('')
	const [prompt, setPrompt] = useState('')
	const [generatingImg, setGeneratingImg] = useState(false)
	const [activeEditorTab, setActiveEditorTab] = useState('')
	const [activeFilterTab, setActiveFilterTab] = useState({
		logoShirt: true,
		styleShirt: false,
	})
	const generateTabContent = () => {
		switch (activeEditorTab) {
			case 'colorpicker':
				return <ColorPicker />
			case 'filepicker':
				return <FilePicker
					file={file}
					setFile={setFile}
					readFile={readFile}
				/>
			case 'aipicker':
				return <AIPicker />
			default:
				return null
		}
	}

	const handleDecals = (type, result) => {
		const decalType = DecalTypes[type]
		state[decalType.stateProperty] = result
		if (!activeEditorTab[decalType.filterTab]) {
			handleActiveFilterTab(decalType.filterTab)
		}
	}

	const handleActiveFilterTab = (tab) => {
		switch (tab) {
			case 'logoShirt':
				state.isLogoTexture = !activeFilterTab[tab]
				break
			case 'stylishShirt':
				state.isFullTexture = !activeFilterTab[tab]
			default:
				state.isLogoTexture = true
				state.isFullTexture = false
		}
	}

	const readFile = type => {
		reader(file).then(result => {
			handleDecals(type, result)
			setActiveEditorTab('')
		})
	}

	return <AnimatePresence>
		{
			!snap.intro && (
				<>
					<motion.div
						key="custom"
						className="absolute top-0 left-0 z-10"
						{...slideAnimation('left')}
					>
						<div className="flex items-center min-h-screen">
							<div className="editortabs-container tabs">
								{
									EditorTabs.map((tab) => (
										<Tab
											key={tab.name}
											tab={tab}
											handleClick={() => {
												setActiveEditorTab(tab.name)
											}}
										/>
									))
								}
								{
									generateTabContent()
								}
							</div>

						</div>
					</motion.div>
					<motion.div
						className="absolute top-5 right-5 z-10"
					>
						<CustomButton
							type="filled"
							title="Go Back"
							handleClick={() => state.intro = true}
							customStyles="w-fit px-4 py-2.5 font-bold text-sm"
						/>
					</motion.div>
					<motion.div
						className="filtertabs-container"
						{...slideAnimation('up')}
					>
						{
							FilterTabs.map((tab) => (
								<Tab
									key={tab.name}
									tab={tab}
									isFilterTab=""
									handleClick={() => {

									}}
								/>
							))
						}
					</motion.div>
				</>
			)
		}
	</AnimatePresence>
}
export default Customizer