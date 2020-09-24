import MaterialTable from "material-table";
import React from "react";
import { useTranslation } from "react-i18next";

const AdvanceTable = (props) => {
  const { t } = useTranslation();
  return (
    <MaterialTable
      title={props.title ? props.title : ""}
      columns={props.columns}
      data={props.data}
      actions={props.actions}
      options={{
        actionsColumnIndex: -1,
        ...props.options,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: t("table.body.emptyDataSourceMessage"),
          addTooltip: t("table.body.addTooltip"),
          deleteTooltip: t("table.body.deleteTooltip"),
          editTooltip: t("table.body.editTooltip"),
          filterRow: {
            filterTooltip: t("table.body.filterRow.filterTooltip"),
          },
          editRow: {
            deleteText: t("table.body.emptyDataSourceMessage"),
            cancelTooltip: t("table.body.emptyDataSourceMessage"),
            saveTooltip: t("table.body.emptyDataSourceMessage"),
          },
        },
        grouping: {
          placeholder: t("table.grouping.placeholder"),
        },
        header: {
          actions: t("table.header.actions"),
        },
        pagination: {
          labelDisplayedRows: t("table.pagination.labelDisplayedRows"),
          labelRowsSelect: t("table.pagination.labelRowsSelect"),
          labelRowsPerPage: t("table.pagination.labelRowsPerPage"),
          firstAriaLabel: t("table.pagination.firstAriaLabel"),
          firstTooltip: t("table.pagination.firstTooltip"),
          previousAriaLabel: t("table.pagination.previousAriaLabel"),
          previousTooltip: t("table.pagination.previousTooltip"),
          nextAriaLabel: t("table.pagination.nextAriaLabel"),
          nextTooltip: t("table.pagination.nextTooltip"),
          lastAriaLabel: t("table.pagination.lastAriaLabel"),
          lastTooltip: t("table.pagination.lastTooltip"),
        },
        toolbar: {
          addRemoveColumns: t("table.toolbar.addRemoveColumns"),
          nRowsSelected: t("table.toolbar.nRowsSelected"),
          showColumnsTitle: t("table.toolbar.showColumnsTitle"),
          showColumnsAriaLabel: t("table.toolbar.showColumnsAriaLabel"),
          exportTitle: t("table.toolbar.exportTitle"),
          exportAriaLabel: t("table.toolbar.exportAriaLabel"),
          exportName: t("table.toolbar.exportName"),
          searchTooltip: t("table.toolbar.searchTooltip"),
          searchPlaceholder: t("table.toolbar.searchPlaceholder"),
        },
      }}
    />
  );
};

export default AdvanceTable;
