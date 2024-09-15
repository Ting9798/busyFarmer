const Breadcrumbs = ({ paths }) => {
    return (
        <ul className='breadcrumbs-box'>
            {paths.map((path, index) => (
                <li key={index} style={{ marginRight: '8px' }}>
                    {index < paths.length - 1 ? (
                        <a href={path.href}>{path.name}</a>
                    ) : (
                        <span>{path.name}</span>
                    )}
                    {index < paths.length - 1 && ' > '}
                </li>
            ))}
        </ul>
    );
};