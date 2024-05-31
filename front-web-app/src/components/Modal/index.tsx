import Modal, { Styles } from 'react-modal';


interface ModalProps{
    width: string;
    height: string;
    isModalClosed: () => void;
    isModalOpen: boolean;
    title: string;
    margin?: string;
    children: React.ReactNode;
}

function CustomModal(props: ModalProps) {
	const isMobile = window.innerWidth < 768;
	const actualWidth = isMobile ? '90%' : props.width;
	const actualHeight = isMobile ? '50vh' : props.height;

	const customStylesModal: Styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
        },
        content: {
            width: actualWidth,
            height: actualHeight,
            margin: props.margin || 'auto',
            border: 'none',
            background: "#fefefe",
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '0',
            inset:'0',
            zIndex:"2"
        }
    };

	return (
		<Modal
			isOpen={props.isModalOpen}
			onRequestClose={props.isModalClosed}
			style={customStylesModal}
			ariaHideApp={false}
		>
			<div className="header-modal">
				<h2 className="title">{props.title}</h2>
				<button className="btn-close btn-header" onClick={props.isModalClosed} />
			</div>
			<div className="content-modal">{props.children}</div>
			
		</Modal>
	);
}

export default CustomModal;