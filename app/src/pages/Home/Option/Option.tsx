import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, IconButtonProps, Rating, styled, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../Home.css';
import './Option.css';
import { useState } from 'react';
import { formatValue } from '../../../utils/utils';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export interface IOption {
    id: number,
    name: string,
    description: string,
    vehicle: string,
    review: {
        rating: number,
        comment: string
    },
    value: number
}

interface IOptionInput {
    option: IOption,
    onClick: (option: IOption) => void
}

export default function Option({ option, onClick }: IOptionInput) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src="perfil.png" />
                }
                title={
                    <div className='title-option'>
                        <Typography variant="subtitle1">{option.name} </Typography>
                        <Rating value={option.review.rating} readOnly />
                    </div>
                }
                subheader={<Typography variant='subtitle2'>{option.vehicle}</Typography>}
            ></CardHeader>
            <CardContent>
                <Typography variant='body1'>
                    {option.description}
                </Typography>
            </CardContent>
            <CardActions className='btn'>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                <Button size="small" variant='contained' onClick={() => onClick(option)}>
                    <Typography variant='button'> {formatValue(option.value)} </Typography>
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant='h6'>Avaliações</Typography>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" src="perfil.png" />
                            }
                            title={
                                <div className='title-option'>
                                    <Typography variant="subtitle1">Anônimo </Typography>
                                    <Rating value={option.review.rating} readOnly />
                                </div>
                            }
                        ></CardHeader>
                        <CardContent>
                            <Typography variant='body2'> {option.review.comment} </Typography>
                        </CardContent>
                    </Card>
                </CardContent>
            </Collapse>
        </Card>
    )
}