import { useNavigate } from 'react-router-dom';
import { DirectoryItemContainer, DirectoryItemBackground, DirectoryItemBody } from './directory-item.styles'

const DirectoryItem = ({ title, imageUrl }) => {
    const navigate = useNavigate();

    const directoryClickHandler = () => navigate(`shop/${title}`);

    return (
        <DirectoryItemContainer onClick={directoryClickHandler}>

            <DirectoryItemBackground 
                imageUrl={imageUrl}
            ></DirectoryItemBackground>

            <DirectoryItemBody>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </DirectoryItemBody>

        </DirectoryItemContainer>
    )
}

export default DirectoryItem;