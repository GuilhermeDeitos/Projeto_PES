import Modal, { Styles } from 'react-modal';
import { CloseSharp } from '@mui/icons-material';
import { Button } from '@mui/material';

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
			<div className="header-modal" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #ccc'
            
            }}>
				<h2 className="title">{props.title}</h2>
				<Button className="btn-close btn-header" onClick={props.isModalClosed}>
                    <CloseSharp />
                </Button>
			</div>
			<div className="content-modal">{props.children}</div>
			
		</Modal>
	);
}

export default CustomModal;