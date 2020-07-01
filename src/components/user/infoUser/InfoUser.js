import React from 'react'
import './InfoUser.scss'
import { faMapMarkedAlt, faCalendarAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import localization from 'moment/locale/es'

export default function InfoUser({ user }) {

    return (
        <div className="info-user">
            <h2 className="name">

                {user?.nombres} {user?.apellidos}
            </h2>

            <p className="email">
                {user?.email}
            </p>

            {user?.biografia &&
                <div className="description">{user.biografia}</div>
            }
            <div className="more-info">
                {user?.ubicacion &&
                    <p>
                        <FontAwesomeIcon icon={faMapMarkedAlt} /> {user.ubicacion}
                    </p>
                }

                {user?.sitioWeb &&
                    <p>
                        <FontAwesomeIcon icon={faExternalLinkAlt} /> <a href={user.sitioWeb} parent="_blank">{user.sitioWeb}</a>
                    </p>
                }

                {user?.fechaNacimiento &&
                    <p>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        {moment(user.fechaNacimiento).locale("es", localization).format('LL')}
                    </p>
                }



            </div>
        </div>
    )
}
