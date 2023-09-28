import { useEffect, useState } from "react";
import { ILBScore, ILanguage } from "../types";
import getLanguages from "../api/getLanguage";
import { AxiosError } from "axios";
import {
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import getLeaderBoard from "../api/getLeaderBoard";

const LeaderBoard = () => {
    const [languages, setLanguages] = useState<ILanguage[]>([]);
    const [language, setLanguage] = useState<string>("");
    const [scores, setScores] = useState<ILBScore[]>([]);
    useEffect(() => {
        getLanguages()
            .then((langs) => {
                setLanguages(langs);
                setLanguage(langs[0].language);
            })
            .catch((error) => {
                if (error instanceof AxiosError)
                    console.log(error.response?.data);
            });
    }, []);

    useEffect(() => {
        getLeaderBoard(language)
            .then((lbscores) => {
                setScores(lbscores);
            })
            .catch((error) => {
                if (error instanceof AxiosError)
                    console.log(error.response?.data);
            });
    }, [language]);

    return (
        <div>
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
            >
                Leaderboard
            </Typography>
            <Select
                label="Language"
                value={language}
                onChange={(e) => {
                    setLanguage(e.target.value);
                }}
                sx={{
                    minWidth: "200px",
                }}
            >
                {languages.length != 0 &&
                    languages.map((lang) => (
                        <MenuItem
                            key={lang.language}
                            value={lang.language}
                        >
                            {lang.language}
                        </MenuItem>
                    ))}
            </Select>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scores.map((score) => (
                        <TableRow key={score.user.id}>
                            <TableCell>{score.user.username}</TableCell>
                            <TableCell>{score.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default LeaderBoard;
