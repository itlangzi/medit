
import React from 'react'
import { Translation } from '../../i18n'
export default ({ cssPrefix, text, children, loading = false }) => (
    <div className={`${loading ? `${cssPrefix}spinner` : ''}`}>
        {loading ? text ? (
            <Translation>
                {t => <div className={`${cssPrefix}spinner--text`}>{t(text)}</div>}
            </Translation>
        ) : null : ""}
        {children}
    </div>
)