import React, { Fragment } from "react";
import { Grid, Card, Icon, Fab } from "@material-ui/core";
import { useTranslation } from "react-i18next";


const StatsCard = (props) => {

    const { t } = useTranslation();

    return (
        <Fragment>
            <Grid item xs={12} md={6}>
                <Card elevation={3} className="p-4">
                    <div className="flex items-center">
                        <Fab
                            size="medium"
                            className="bg-light-green circle-44 box-shadow-none"
                        >
                            <Icon className="text-green">power</Icon>
                        </Fab>
                        <h3 className="font-medium text-green m-0 ml-3">{t('bot-stats.online')}<span className="text-muted pl-1">{props.data.reduce((acc, cur) => cur.status === 2 ? ++acc : acc, 0)}</span></h3>
                    </div>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card elevation={3} className="p-4">
                    <div className="flex items-center">
                        <Fab
                            size="medium"
                            className="bg-light-error circle-44 box-shadow-none overflow-hidden"
                        >
                            <Icon className="text-error">power_off</Icon>
                        </Fab>
                        <h3 className="font-medium text-error m-0 ml-3">{t('bot-stats.offline')}<span className="text-muted pl-1">{props.data.reduce((acc, cur) => cur.status !== 2 ? ++acc : acc, 0)}</span></h3>
                    </div>
                </Card>
            </Grid>
        </Fragment>
    );
};

export default StatsCard;