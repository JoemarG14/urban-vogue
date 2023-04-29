
import { DirectoryContainer } from './directory.styles'

import DirectoryItem from '../directory-item/directory-item.component';

const Directory = ({categories}) => (
    <DirectoryContainer>
        {
            Object.keys(categories).map((title) => {
                const imageUrl = categories[title].imageUrl;
                return <DirectoryItem key={title} title={title} imageUrl={imageUrl}/>
            })
        }
    </DirectoryContainer>
)

export default Directory;