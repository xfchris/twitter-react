import React, { useState, useCallback } from 'react'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import './EditUserForm.scss'
import DatePicker from 'react-datepicker'
import es from 'date-fns/locale/es'
import { useDropzone } from 'react-dropzone'
import { API_HOST } from '../../../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { uploadBannerApi, uploadAvatarApi, updateInfoApi } from '../../../api/user'
import { toast } from 'react-toastify'

export default function EditUserForm({ user, setShowModal }) {

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(initialValue(user))

    //Banner URL
    const [bannerUrl, setBannerUrl] = useState(
        user?.banner ? `${API_HOST}/obtener-banner?id=${user.id}` : null
    )
    const [bannerFile, setBannerFile] = useState(null)

    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0]
        setBannerUrl(URL.createObjectURL(file))
        setBannerFile(file)
    }, [])

    const { getRootProps: getRootBannerProps,
        getInputProps: getInputBannerProps } =
        useDropzone({
            accept: "image/jpeg, image/png",
            noKeyboard: true,
            multiple: false,
            onDrop: onDropBanner
        })
    //Fin Banner URL



    //Avatar URL

    const [avatarUrl, setAvatarUrl] = useState(
        user?.avatar ? `${API_HOST}/obtener-avatar?id=${user.id}` : null
    )

    const [avatarFile, setAvatarFile] = useState(null)

    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0]
        setAvatarUrl(URL.createObjectURL(file))
        setAvatarFile(file)
    },[])
    const { getRootProps: getRootAvatarProps,
        getInputProps: getInputAvatarProps } = useDropzone({
            accept: "image/jpeg, image/png",
            noKeyboard: true,
            multiple: false,
            onDrop: onDropAvatar
        })
    //Fin Avatar URL


    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (bannerFile) {
            await uploadBannerApi(bannerFile).catch(() => {
                toast.error("Error al subir nuevo banner")
            })
        }

        if (avatarFile) {
            await uploadAvatarApi(avatarFile).catch(() => {
                toast.error("Error al subir nuevo avatar")
            })
        }

        await updateInfoApi(formData)
            .then(() => {
                setShowModal(false)
            })
            .catch(() => {
                toast.error("Error al actualizar los datos")
            })


        window.location.reload()
        setLoading(false)
    }


    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="edit-user-form">

            <div className="banner"
                style={{ backgroundImage: `url('${bannerUrl}')` }}
                {...getRootBannerProps()}>
                <input {...getInputBannerProps()} />
                <FontAwesomeIcon icon={faCamera} />
            </div>

            <div className="avatar"
                style={{ backgroundImage: `url('${avatarUrl}')` }}
                {...getRootAvatarProps()}>
                <input {...getInputAvatarProps()} />
                <FontAwesomeIcon icon={faCamera} />
            </div>


            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text"
                                onChange={onChange}
                                defaultValue={formData.nombres}
                                placeholder="Nombres" name="nombres" />
                        </Col>
                        <Col>
                            <Form.Control type="text"
                                onChange={onChange}
                                defaultValue={formData.apellidos}
                                placeholder="Nombres" name="nombres" />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        as="textarea"
                        row="3"
                        placeholder="Agrega tu biografia"
                        defaultValue={formData.biografia}
                        name="biografia"
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text"
                        onChange={onChange}
                        placeholder="Sitio web"
                        defaultValue={formData.sitioWeb}

                        name="sitioWeb" />
                </Form.Group>


                <DatePicker
                    onChange={value => setFormData({
                        ...formData,
                        fechaNacimiento: value
                    })}
                    placeholder="Fecha de nacimiento"
                    locale={es}
                    selected={new Date(formData.fechaNacimiento)}
                />

                <Button className="btn-submit" variant="primary"
                    type="submit">

                    {loading && <Spinner animation="border" size="sm" />} Actualizar
                    </Button>


            </Form>
        </div>
    )
}




function initialValue(user) {
    return {
        nombres: user.nombres || "",
        apellidos: user.apellidos || "",
        biografia: user.biografia || "",
        ubicacion: user.ubicacion || "",
        sitioWeb: user.sitioWeb || "",
        fechaNacimiento: user.fechaNacimiento || ""
    }
}
