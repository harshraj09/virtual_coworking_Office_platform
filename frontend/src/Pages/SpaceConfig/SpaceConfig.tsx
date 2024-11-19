import React, { useState } from 'react'
import { apiContext } from '../../utils/apiContext'
import Loading from '../../components/Loading/Loading'
import { showToast } from '../../components/Toast/Toast'
import { useNavigate } from 'react-router-dom'

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
        if(response.data.success){
            showToast(response.data.message, 'success', 3000);
            localStorage.setItem("office_space", JSON.stringify(response.data.data));
            navigate(`/space/${response.data.data._id}`);
        }else{
            showToast(response.data.message, "error", 3000);
        }
        setLoading(false);
    }

    return (
        <div>
            {
                loading ? <Loading /> :
                    <>
                        <div>
                            <input type="text" name="spaceName" value={formData.spaceName} placeholder='Name Of Space' onChange={handleChange} />
                            <input type="number" name='numberOfMembers' value={formData.numberOfMembers} placeholder='Team Size' onChange={handleChange} />
                            <button onClick={handelClick}>Create Space</button>
                        </div>

                    </>
            }
        </div>
    )
}

export default SpaceConfig