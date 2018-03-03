import React, { Component } from 'react';
import { Chart, Geom, Tooltip, View, Label } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import autoHeight from '../autoHeight';
import styles from '../index.less';

@autoHeight()
class Sankey extends Component {
  static defaultProps = {
    limitColor: 'rgb(255, 144, 24)',
    color: 'rgb(24, 144, 255)',
  };

  handleRoot = (n) => {
    this.root = n;
  };

  handleRef = (n) => {
    this.node = n;
  };

  render() {
    const {
      height,
      title,
      forceFit = true,
      data,
      edgeColor = '#bbb',
      edgeTooltip = ['target*source*value', (target, source, value) => {
        return {
          name: `${source.name} to ${target.name} </span>`,
          value,
        };
      }],
    } = this.props;

    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: 'graph',
    });
    dv.transform({
      type: 'diagram.sankey',
    });
    const scale = {
      x: {
        sync: true,
      },
      y: {
        sync: true,
      },
    };
    console.log(dv);
    return (
      <div className={styles.chart} style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
          <Chart
            forceFit={forceFit}
            data={[1]}
            height={title ? height - 41 : height}
            scale={scale}
            padding={[0, 400, 0, 0]}
          >
            <Tooltip showTitle={false} />
            <View data={dv.edges}>
              <Geom
                type="edge"
                position="x*y"
                shape="arc"
                color={edgeColor}
                opacity={0.6}
                tooltip={edgeTooltip}
              />
            </View>
            <View data={dv.nodes}>
              <Geom
                type="polygon"
                position="x*y"
                color="name"
                tooltip={false}
              >
                <Label
                  content="name"
                  textStyle={{
                    fill: '#545454',
                    textAlign: 'start',
                  }}
                  offset={0}
                  formatter={(val) => {
                      return `  ${val}`;
                    }
                  }
                />
              </Geom>
            </View>
          </Chart>
        </div>
      </div>
    );
  }
}

export default Sankey;
