import goTo from 'vuetify/es5/services/goto'

export default async (to) => {
    if (to.hash) {
        let offset = 90;
        const toolbar = document.querySelector("#appBar")
        if (toolbar) {
            offset = toolbar.clientHeight
        }
        const positionY = await goTo(to.hash, {
            offset: offset,
            appOffset: false,
            duration: 1000
        })
        return {
            x: 0,
            y: positionY
        }
    } else {
        return { x: 0, y: 0 }
    }
}
