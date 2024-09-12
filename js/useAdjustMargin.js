const { useEffect } = React;
function useAdjustMargin(headerClassName) {
    useEffect(() => {
        const adjustMargin = () => {
            const greenTopbar = document.querySelector(`.${headerClassName}`);
            const title = document.getElementById('title');

            if (greenTopbar && title) {
                let topHeight = greenTopbar.offsetHeight;
                title.style.marginTop = `${topHeight}px`;
            }
        };
        adjustMargin();

        window.addEventListener('resize', adjustMargin);

        return () => {
            window.removeEventListener('resize', adjustMargin);
        };
    }, [headerClassName]);
}