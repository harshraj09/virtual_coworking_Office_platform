import React, { useState } from 'react'
import { apiContext } from '../../utils/apiContext'
import Loading from '../../components/Loading/Loading'
import { showToast } from '../../components/Toast/Toast'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./spaceconfig.module.css";

interface IFormData {
    spaceName: string,
    numberOfMembers: number
}

const SpaceConfig: React.FC = () => {
    const [formData, setFormData] = useState<IFormData>({
        spaceName: "",
        numberOfMembers: 0
    })
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handelClick = async () => {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem("token") as string);
        const response = await apiContext.post('/api/create-space', formData, {
            headers: {
                Authorization: `Bearear ${token}`
            }
        });
        if (response.data.success) {
            showToast(response.data.message, 'success', 3000);
            localStorage.setItem("office_space", JSON.stringify(response.data.data));
            navigate(`/space/${response.data.data._id}`);
        } else {
            showToast(response.data.message, "error", 3000);
        }
        setLoading(false);
    }

    return (
        <div>
            {
                loading ? <Loading /> :
                    <>
                        <div className={styles.spaceConfigPage}>
                            <header className={styles.header}>
                                <Link to="/dashboard" className={styles.backLink}>← Back to Home</Link>
                                <h1 className={styles.title}>Configure Your Space</h1>
                            </header>
                            <main className={styles.main}>
                                <form onSubmit={handelClick} className={styles.form}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="spaceName" className={styles.label}>Space Name</label>
                                        <input
                                            type="text"
                                            id="spaceName"
                                            value={formData.spaceName}
                                            onChange={handleChange}
                                            required
                                            name='spaceName'
                                            className={styles.input}
                                            placeholder="Enter your space name"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="spaceSize" className={styles.label}>Space Size (in sq ft)</label>
                                        <input
                                        name='numberOfMembers'
                                            type="number"
                                            id="spaceSize"
                                            value={formData.numberOfMembers}
                                            onChange={handleChange}
                                            required
                                            min="1"
                                            className={styles.input}
                                            placeholder="Enter space size"
                                        />
                                    </div>
                                    <button type="submit" className={styles.submitButton}>
                                        Create Space
                                    </button>
                                </form>
                            </main>
                        </div>

                    </>
            }
        </div>
    )
}

export default SpaceConfig