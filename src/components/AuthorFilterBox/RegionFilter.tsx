import { getAllRegions } from '@apis/region';
import { selectedRegionIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useReactFlow } from 'reactflow';
import { css } from 'styled-system/css';

function RegionFilter() {
  const setSelectedRegionId = useSetAtom(selectedRegionIdAtom);

  const { data: region = [] } = useQuery({
    queryKey: ['region'],
    queryFn: getAllRegions,
    select: response => response.data,
  });

  const reactflow = useReactFlow();

  return (
    <Select.Root
      onValueChange={value => {
        setSelectedRegionId(Number(value));

        reactflow.setNodes(nodes => {
          return nodes.map(node => {
            if (
              node.data?.region
                .map((_region: any) => _region.id)
                .includes(Number(value))
            ) {
              return {
                ...node,
                data: {
                  ...node.data,
                  activeFiltered: true,
                },
              };
            }

            return { ...node, data: { ...node.data, activeFiltered: false } };
          });
        });
      }}
    >
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Pick a region"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>Region</Select.Label>
          {region
            .sort((a, b) => a.region.localeCompare(b.region))
            .map(_region => (
              <Select.Item key={_region.id} value={String(_region.id)}>
                {_region.region}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default RegionFilter;
