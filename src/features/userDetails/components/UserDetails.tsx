import { User } from "@/types";
import {
    Table,
    Typography,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Proficiency } from "../types";
import getUserProficiency from "../api/getProficiency";
import { AxiosError } from "axios";
import getLevel from "../utils/getLevel";

const UserDetails = ({ user }: { user: User }) => {
    const [proficiencies, setProficiencies] = useState<Proficiency[]>([]);
    useEffect(() => {
        getUserProficiency()
            .then((proficiencies) => {
                setProficiencies(proficiencies);
            })
            .catch((error: AxiosError) => {
                console.log(error.message);
            });
    }, []);

    return (
        <>
            <Typography
                variant="h4"
                gutterBottom
            >
                {user.username}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Language</TableCell>
                        <TableCell>Proficiency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {proficiencies.map((proficiency) => (
                        <TableRow key={proficiency.language}>
                            <TableCell>{proficiency.language}</TableCell>
                            <TableCell>
                                {getLevel(proficiency.proficiency)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default UserDetails;
