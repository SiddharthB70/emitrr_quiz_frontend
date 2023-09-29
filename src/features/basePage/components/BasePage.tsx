import getLanguages from "@/features/leaderboard/api/getLanguage";
import LeaderBoard from "@/features/leaderboard/components/LeaderBoard";
import { ILanguage } from "@/features/leaderboard/types";
import { NotificationType } from "@/features/notification/types";
import Quiz from "@/features/quiz/components/Quiz";
import UserDetails from "@/features/userDetails/components/UserDetails";
import { User } from "@/types";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const BasePage = ({
    user,
    addNotification,
}: {
    user: User;
    addNotification: (message: string, type: NotificationType) => void;
}) => {
    const [value, setValue] = useState("1");
    const [languages, setLanguages] = useState<ILanguage[]>([]);

    useEffect(() => {
        getLanguages()
            .then((langs) => {
                setLanguages(langs);
            })
            .catch((error) => {
                if (error instanceof AxiosError)
                    console.log(error.response?.data);
            });
    }, []);

    return (
        <Box>
            <TabContext value={value}>
                <TabList
                    onChange={(_e, value) => {
                        setValue(value);
                    }}
                >
                    <Tab
                        label="Leaderboard"
                        value="1"
                    />
                    <Tab
                        label="Quiz"
                        value="2"
                    />
                    <Tab
                        label="User"
                        value="3"
                    />
                </TabList>
                <TabPanel value="1">
                    <LeaderBoard languages={languages} />
                </TabPanel>
                <TabPanel value="2">
                    <Quiz
                        languages={languages}
                        addNotification={addNotification}
                    />
                </TabPanel>
                <TabPanel value="3">
                    <UserDetails user={user} />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default BasePage;
