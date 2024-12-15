import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './Toast.css';

interface ToastProps {
    message: string;
    variant: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
    message, 
    variant, 
    duration = 3000, 
    onClose 
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`toast toast-${variant}`}>
            <div className={`toast-content`}>
                <p>{message}</p>
                <button 
                    className="toast-close"
                    onClick={() => {
                        setIsVisible(false);
                        onClose?.();
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

// Create a container for managing multiple toasts
let toastContainer: HTMLDivElement | null = null;

// Helper function to create and append toast container
const createToastContainer = () => {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
};

// Function to show toast from anywhere
export const showToast = (
    message: string, 
    variant: ToastProps['variant'], 
    duration?: number
) => {
    const container = createToastContainer();
    const toastElement = document.createElement('div');
    container.appendChild(toastElement);

    const removeToast = () => {
        if (toastElement.parentElement) {
            toastElement.parentElement.removeChild(toastElement);
        }
    };

    const root = createRoot(toastElement);
    root.render(
        <Toast 
            message={message} 
            variant={variant} 
            duration={duration} 
            onClose={removeToast}
        />
    );
};

export default Toast;
