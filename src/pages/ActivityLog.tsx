// ... continuing from previous code
                <TextField
                  select
                  fullWidth
                  label="Action Types"
                  SelectProps={{ multiple: true }}
                  value={filters.actionTypes}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      actionTypes: e.target.value as LogActionType[],
                    })
                  }
                >
                  {Object.values(LogActionType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.replace(/_/g, ' ')}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Severity"
                  SelectProps={{ multiple: true }}
                  value={filters.severity}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      severity: e.target.value as LogSeverity[],
                    })
                  }
                >
                  {Object.values(LogSeverity).map((sev) => (
                    <MenuItem key={sev} value={sev}>
                      {sev}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Resource</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} hover>
                  <TableCell>
                    {format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss')}
                  </TableCell>
                  <TableCell>{log.action_type.replace(/_/g, ' ')}</TableCell>
                  <TableCell>
                    <Chip
                      label={log.severity}
                      color={severityColors[log.severity]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {log.resource_type && log.resource_id
                      ? `${log.resource_type} #${log.resource_id}`
                      : '-'}
                  </TableCell>
                  <TableCell>{log.user_id || 'System'}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setDetailsDialog({ open: true, log })
                      }
                    >
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[25, 50, 100]}
        />
      </Paper>

      {detailsDialog.log && renderLogDetails(detailsDialog.log)}
    </Box>
  );
};

export default ActivityLog;