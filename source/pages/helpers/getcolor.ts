const getColor = (type: string): string => {
    const color = {
        grass: '#9bcc50',
        poison: '#b97fc9',
        fire: '#fd7d24',
        flying: '#3dc7ef',
        ice: '#51c4e7',
        psychic: '#f366b9',
        water: '#4592c4',
        electric: '#eed535',
        bug: '#729f3f',
        rock: '#a38c21',
        normal: '#a4acaf',
        fighting: '#d56723',
        ground: '#f7de3f',
        ghost: '#7b62a3',
        steel: '#9eb7b8',
        dragon: '#53a4cf',
        dark: '#707070',
        fairy: '#fdb9e9'
    }
    return color[type.toLowerCase()];
}

export default getColor;