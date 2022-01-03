package main

import (
	"github.com/andlabs/ui"
)

type NameModel struct {
	Names []string
	m     *ui.TableModel
}

func (n *NameModel) AddName(name string) {
	n.Names = append(n.Names, name)
	ui.QueueMain(func() {
		n.m.RowInserted(len(n.Names) - 1) // Update
	})
}

func (n *NameModel) RemoveName(name string) {
	// Find
	ind := -1
	for i, n := range n.Names {
		if n == name {
			ind = i
			break
		}
	}
	if ind == -1 {
		return
	}

	// Remove
	copy(n.Names[ind:], n.Names[ind+1:])
	n.Names = n.Names[:len(n.Names)-1]

	// Remove from table
	ui.QueueMain(func() {
		n.m.RowDeleted(ind)
	})
}

func (n *NameModel) ColumnTypes(m *ui.TableModel) []ui.TableValue {
	return []ui.TableValue{
		ui.TableString(""), // column 0, names
	}
}

func (n *NameModel) NumRows(m *ui.TableModel) int {
	return len(n.Names)
}

func (n *NameModel) CellValue(m *ui.TableModel, row, column int) ui.TableValue {
	return ui.TableString(n.Names[row])
}

func (n *NameModel) SetCellValue(m *ui.TableModel, row, column int, value ui.TableValue) {} // Ignore, since no columns are editable
