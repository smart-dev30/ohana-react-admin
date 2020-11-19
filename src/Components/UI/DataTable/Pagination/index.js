import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import map from 'lodash/map'

import { paginationChevronGlyph } from 'Assets/Svg/Table'

import Icon from '../../Icon'
import Select from '../../Select'

import { Container, Pager, PreviousPage, Pages, NextPage } from './styles'

const defaultButton = ({ children, ...rest }) => <div {...rest}>{children}</div>

defaultButton.propTypes = {
  children: PropTypes.node.isRequired,
}

class Pagination extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pages } = this.props

    if (pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, nextProps.pages),
      })
    }

    this.changePage(nextProps.page + 1)()
  }

  filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter(page => page <= totalPages)
  }

  getVisiblePages = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total)
    }
    if (page % 5 >= 0 && page > 4 && page + 2 < total) {
      return [1, page - 1, page, page + 1, total]
    }
    if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
      return [1, total - 3, total - 2, total - 1, total]
    }
    return [1, 2, 3, 4, 5, total]
  }

  handlePrevPage = () => {
    const { page } = this.props
    const activePage = page + 1
    if (activePage === 1) return null
    return this.changePage(activePage - 1)()
  }

  handleNextPage = () => {
    const { page, pages } = this.props
    const activePage = page + 1

    if (activePage === pages) return null
    return this.changePage(activePage + 1)()
  }

  changePage = page => () => {
    const { page: oldPage, pages, onPageChange } = this.props

    const activePage = oldPage + 1

    if (page === activePage) {
      return
    }

    const visiblePages = this.getVisiblePages(page, pages)

    this.setState({
      visiblePages: this.filterPages(visiblePages, pages),
    })

    onPageChange(page - 1)
  }

  handlePageSizeChange = option => {
    const { onPageSizeChange } = this.props
    onPageSizeChange(option.value)
  }

  render() {
    const {
      page,
      pages,
      PageButtonComponent = defaultButton,
      previousText,
      nextText,
      pageSize,
      pageSizeOptions,
      showSizeSelect,
    } = this.props

    const { visiblePages } = this.state

    const activePage = page + 1

    return (
      <Container>
        {showSizeSelect ? (
          <Select
            isSearchable={false}
            mr={3}
            options={map(pageSizeOptions, option => ({
              value: option,
              label: option,
            }))}
            value={{ value: pageSize, label: pageSize }}
            width={64}
            onChange={this.handlePageSizeChange}
          />
        ) : (
          <div />
        )}
        <Pager>
          <PreviousPage>
            <PageButtonComponent
              className={activePage === 1 ? 'disabled' : ''}
              disabled={activePage === 1}
              onClick={this.handlePrevPage}
            >
              <Icon glyph={paginationChevronGlyph} size={8} />
              {previousText}
            </PageButtonComponent>
          </PreviousPage>
          <Pages>
            {map(visiblePages, (visiblePage, index, array) => {
              return (
                <PageButtonComponent
                  className={
                    activePage === visiblePage
                      ? 'pagination-page pagination-page--active'
                      : 'pagination-page'
                  }
                  key={visiblePage}
                  onClick={this.changePage(visiblePage)}
                >
                  {array[index - 1] + 2 < visiblePage
                    ? `... ${visiblePage}`
                    : visiblePage}
                </PageButtonComponent>
              )
            })}
          </Pages>
          <NextPage>
            <PageButtonComponent
              className={activePage === pages ? 'disabled' : ''}
              disabled={activePage === pages}
              onClick={this.handleNextPage}
            >
              {nextText}
              <Icon glyph={paginationChevronGlyph} size={8} />
            </PageButtonComponent>
          </NextPage>
        </Pager>
      </Container>
    )
  }
}

Pagination.defaultProps = {
  PageButtonComponent: undefined,
  showSizeSelect: false,
}

Pagination.propTypes = {
  PageButtonComponent: PropTypes.any,
  nextText: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeOptions: PropTypes.array.isRequired,
  pages: PropTypes.number.isRequired,
  previousText: PropTypes.string.isRequired,
  showSizeSelect: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
}

export default Pagination
