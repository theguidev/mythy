import Link from "next/link";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles/Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  return (
    <div className={styles.modal_container}>
      <div ref={modalRef} className={styles.modal}>
        {children}
      </div>
    </div>
  );
}